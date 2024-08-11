from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from server.database.models.truckModel import Truck , TruckQueue
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime

def schedule_trucks(session: Session):
    # Get the current date and time
    now = datetime.now()
    today = now.date()

    # Get all trucks scheduled for today with arrival time greater than now
    trucks = session.query(Truck).filter(
        func.date(Truck.arrival_time) == today,
        Truck.arrival_time > now
    ).all()

    if not trucks:
        return {"message": "No trucks to schedule at this time"}

    # Normalize arrival time and priority
    min_arrival = min(truck.arrival_time for truck in trucks)
    max_arrival = max(truck.arrival_time for truck in trucks)
    min_priority = min(truck.truck_priority for truck in trucks)
    max_priority = max(truck.truck_priority for truck in trucks)

    for truck in trucks:
        # Normalize arrival time (earlier is better)
        normalized_arrival = (truck.arrival_time - min_arrival).total_seconds() / (max_arrival - min_arrival).total_seconds()

        # Normalize priority (higher priority is better)
        normalized_priority = (truck.truck_priority - min_priority) / (max_priority - min_priority)

        # Calculate weighted score
        truck.score = 0.5 * (1 - normalized_arrival) + 0.5 * normalized_priority

    # Sort trucks by their computed score
    sorted_trucks = sorted(trucks, key=lambda t: t.score, reverse=True)

    # Assign docks based on sorted scores and save to truck_queue table
    for idx, truck in enumerate(sorted_trucks):
        dock_assigned = idx + 1  # Example: Assign dock based on position
        
        # Save the truck and assigned dock to the truck_queue table
        truck_queue_entry = TruckQueue(
            truck_id=truck.truck_id,
            dock_assigned=dock_assigned,
            scheduled_time=now
        )
        session.add(truck_queue_entry)
        
        # Optionally update the dock_assigned in the Truck table if required
        truck.dock_assigned = dock_assigned

    session.commit()

    return {"scheduled_trucks": [truck.truck_id for truck in sorted_trucks]}
