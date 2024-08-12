from sqlalchemy.orm import Session
from server.database.models.userModel import User 
from server.database.schemas import TruckCreate
from server.database.models.employeeModel import Employee
from server.database.models.truckModel import Dock,Truck

def create_trucks(db: Session,truck:int):
    db_truck = Truck(truck_number=truck.truck_number,truck_priority=truck.truck_priority,driver_id=truck.driver_id,supervisor_id=truck.supervisor_id,dock_assigned=truck.dock_assigned)
    db.add(db_truck)
    db.commit()
    db.refresh(db_truck)
    return db_truck
     


def create_dock(db: Session,docks_id:int):
    new_dock=Dock(docks_id=docks_id)
    db.add(new_dock)
    db.commit()
    return new_dock


def get_dock(db: Session,docks_id:int):
    new_dock=db.query(Dock).filter(Dock.docks_id==docks_id).first()
    return new_dock


def get_all_dock(db: Session):
    return db.query(Dock).all()


def truncate_dock(db: Session,docks_id:int):
    dock = db.query(Dock).filter(Dock.docks_id == docks_id).first()
    if dock:
        if dock.employees is not None:
            dock.employees=[]
        if dock.truck is not None:
            dock.truck.clear() 
        db.add(dock)
        db.commit()
        return True
    else:
        return False