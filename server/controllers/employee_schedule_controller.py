from sqlalchemy.orm import Session
from sqlalchemy import func , update 
from server.database.models.employeeModel import Employee , EmploymentTypeEnum , UsedEmployeeSet
from server.database.schemas import  EmployeeCreate
from datetime import datetime

def update_resting_employees(session:Session):
    # pass 
    current_time = datetime.now().isoformat()
    stmt = (
        update(Employee)
        .where(
            (Employee.resting_bool == True) &  # Employee is currently resting
            (Employee.resting_until < current_time)  # Resting time has passed
        )
        .values(
            resting_bool=False,  # Set resting to False
            resting_until=None  # Clear the resting_until time
        )
    )
    result = session.execute(stmt)
    session.commit()
    return {'res' : result.rowcount}


def count_working_employees(db :Session) :
    # pass
    return {
        'staff_count' : db.query(Employee).filter(Employee.employment_type == EmploymentTypeEnum.staff).count() ,
        'supervisor_count' : db.query(Employee).filter(Employee.employment_type == EmploymentTypeEnum.supervisor).count()
    }

def del_used_set(db:Session) : 
    count = count_working_employees(db)
    used_staff_count = db.query(func.count(UsedEmployeeSet.id)).join(Employee).filter(
        Employee.employment_type == EmploymentTypeEnum.staff
    ).scalar()
    used_supervisor_count = db.query(func.count(UsedEmployeeSet.id)).join(Employee).filter(
        Employee.employment_type == EmploymentTypeEnum.supervisor
    ).scalar()
    if 0.8 * count['staff_count'] < used_staff_count :
        pass
    if 0.8 * count['supervisor_count'] < used_supervisor_count :
        pass 
    
 
def assign_employee_team_on_request(db:Session  , dock_id:int ,team_size:int = 5 ):
        pass 

# testing the statements 
def main():
    pass