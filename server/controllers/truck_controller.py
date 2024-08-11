from sqlalchemy.orm import Session
from server.database.models.userModel import User 
from server.database.schemas import EmployeeCreate 
from server.database.models.employeeModel import Employee


def create_trucks(db: Session,user_id:int):
    db.query(Employee)
    return 