from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from server.database.models.truckModel import Truck, TruckQueue, Dock, State
from server.controllers.employee_schedule_controller import assign_employee_team_on_request

class DockAllocator:
    def __init__(self, session: Session):
        self.session = session
        self.total_docks = self.session.query(func.count(Dock.docks_id)).scalar()
        self.available_docks = self.total_docks

    def update_available_docks(self):
        occupied_docks = self.session.query(func.count(Dock.docks_id)).filter(Dock.truck != None).scalar()
        self.available_docks = self.total_docks - occupied_docks

    def allocate_trucks(self):
        self.update_available_docks()
        
        while self.available_docks > 0:
            # Get the next truck in the queue
            next_truck = self.session.query(TruckQueue).first()
            
            if not next_truck:
                break  # No more trucks in the queue

            # Allocate the truck to a dock
            self.allocate_truck_to_dock(next_truck)

    def allocate_truck_to_dock(self, truck_queue_entry: TruckQueue):
        # Find an available dock
        available_dock = self.session.query(Dock).filter(Dock.truck == None).first()

        if not available_dock:
            return  # No available docks

        # Get the truck from the Truck table
        truck = self.session.query(Truck).filter(Truck.truck_id == truck_queue_entry.truck_id).first()

        if not truck:
            return  # Truck not found

        # Assign the truck to the dock
        available_dock.truck = truck
        truck.dock = available_dock
        truck.state = State.Processing

        # Assign a crew to the dock
        try:
            assign_employee_team_on_request(self.session, available_dock.docks_id)
        except Exception as e:
            print(f"Failed to assign crew to dock {available_dock.docks_id}: {str(e)}")

        # Remove the truck from the queue
        self.session.delete(truck_queue_entry)

        # Update available docks
        self.available_docks -= 1

        self.session.commit()


    def release_dock(self, dock_id: int):
        dock = self.session.query(Dock).filter(Dock.docks_id == dock_id).first()
        if dock:
            truck = dock.truck
            if truck:
                truck.state = State.Completed
                truck.dock = None
            dock.truck = None
            dock.employees=[]
            self.available_docks += 1
            self.session.commit()

    def get_dock_status(self):
        docks = self.session.query(Dock).all()
        status = []
        for dock in docks:
            dock_status = {
                "dock_id": dock.docks_id,
                "occupied": dock.truck is not None,
                "truck_id": dock.truck.truck_id if dock.truck else None,
                "employees": [emp.id for emp in dock.employees] if dock.employees else []
            }
            status.append(dock_status)
        return status

# Usage example:
# dock_allocator = DockAllocator(db_session, total_docks=10)
# dock_allocator.allocate_trucks()
# dock_allocator.release_dock(1)
# status = dock_allocator.get_dock_status()