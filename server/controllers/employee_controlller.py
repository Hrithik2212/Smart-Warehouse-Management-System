from sqlalchemy.orm import Session
from server.database.models.employeeModel import Employee
from server.database.schemas import  EmployeeCreate

def create_employee(db:Session ,emp :EmployeeCreate ):
    db_employee = Employee(
                    id = emp.id ,
                    name = emp.name ,
                    mobile = emp.mobile ,
                    email = emp.email ,
                    employment_type=emp.employment_type ,
                    heavy_machinery= emp.heavy_machinery ,
                    experience= emp.experience ,
                    gender = emp.gender ,
                    attendance_present= emp.attendance_present ,
                    resting_bool = emp.resting_bool ,
                    resting_until = emp.resting_until
    )
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee



def get_employee(db:Session , id:int):
    return db.query(Employee).filter(Employee.id==id).first()

def raise_notifciation_calls(employee_id):
    pass 
