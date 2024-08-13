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

def create_user(db: Session, emp: EmployeeCreate):

    db_user = User(name=emp.name, email=emp.email,password=get_password_hash("string"),role=emp.employment_type) 
    db.add(db_user)
    db.commit()

    db_employee = Employee(
                    id=db_user.id,
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
    
    
    
    return db_user


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


def get_users(db: Session):
    return db.query(User).all()

def delete_existing_employees(db:Session):
    db.query(User).delete()
    db.query(Employee).delete()
    db.commit()


