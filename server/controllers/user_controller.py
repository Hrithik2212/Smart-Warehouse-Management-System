# app/controllers/user_controller.py
from sqlalchemy.orm import Session
from server.database.models.userModel import User 
from server.database.schemas import EmployeeCreate 
from server.database.models.employeeModel import Employee
from server.controllers.auth import get_password_hash,create_access_token,verify_password
from datetime import datetime, timedelta
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from fastapi import HTTPException

# def create_user(db: Session, emp: EmployeeCreate):
#     db_user = User(name=emp.name, email=emp.email,password=get_password_hash("string"),role=emp.employment_type)
#     db.add(db_user)
#     user = db.query(User).filter(User.email == emp.email).first()
#     db_employee = Employee(
#                     id = user.id ,
#                     name = emp.name ,
#                     mobile = emp.mobile ,
#                     email = emp.email ,
#                     employment_type=emp.employment_type ,
#                     heavy_machinery= emp.heavy_machinery ,
#                     experience= emp.experience ,
#                     gender = emp.gender ,
#                     attendance_present= emp.attendance_present ,
#                     resting_bool = emp.resting_bool ,
#                     resting_until = emp.resting_until
#     )
#     db.add(db_employee)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

def create_user(db: Session, emp: EmployeeCreate):
    try:
        # Get the maximum user ID
        max_id = db.query(func.max(User.id)).scalar() or 0
        new_id = max_id + 1

        # Create new user
        db_user = User(
            id=new_id,
            name=emp.name,
            email=emp.email,
            password=get_password_hash('string'),
            role=emp.employment_type
        )
        
        db.add(db_user)
        db.flush()  # This will try to write to the database without committing
        
        # Create new employee
        db_employee = Employee(
            id=new_id,
            name=emp.name,
            mobile=emp.mobile,
            email=emp.email,
            employment_type=emp.employment_type,
            heavy_machinery=emp.heavy_machinery,
            experience=emp.experience,
            gender=emp.gender,
            attendance_present=emp.attendance_present,
            resting_bool=emp.resting_bool,
            resting_until=emp.resting_until
        )
        
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        
        return db_employee

    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error occurred")


def get_user(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def login(db_user):
    
    access_token_expires = timedelta(minutes=1440)
    access_token = create_access_token(
        data={
            "sub": db_user.email, 
            "id": db_user.id, 
            "name": db_user.name, 
            "role": db_user.role
        }, 
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"} 

