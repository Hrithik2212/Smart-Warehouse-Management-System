from sqlalchemy.orm import Session
from sqlalchemy import func , update 
from server.database.models.employeeModel import Employee
from server.database.schemas import  EmployeeCreate
from datetime import datetime

def update_resting_employees(session):
    current_time = datetime.now().time()
    stmt = (
        update(Employee)
        .where(
            (Employee.resting_bool == True) &  # Employee is currently resting
            (Employee.resting_until < current_time)  # Resting time has passed
            # (Employee.employment_type != "manager") & 
            # (Employee.employment_type != "security") & 
            # (Employee.employment_type != "admin") # Resting time has passed
        )
        .values(
            resting_bool=False,  # Set resting to False
            resting_until=None  # Clear the resting_until time
        )
    )
    result = session.execute(stmt)
    session.commit()
    return result.rowcount


def assign_employee_team_on_request(db:Session  , dock_id:int ,team_size:int = 5 ):
    
    db.query(Employee).filter(Employee.resting_bool==True )
    pass 

# testing the statements 
def main():
    pass