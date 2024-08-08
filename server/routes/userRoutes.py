# app/routes/user.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server.database.database import get_db
from server.database.schemas import User, UserCreate , EmployeeCreate , Employee , AlertMessage
from server.controllers import user_controller , employee_controlller , twilio_controller

router = APIRouter()



@router.get("/")
def read_root():
    return {"Hello": "World"}


@router.post("/users/", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return user_controller.create_user(db=db, user=user)


@router.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_controller.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/users/send_alert_message")
def send_alert_message(alert_message: AlertMessage):
    metadata = twilio_controller.send_alert_message(phone_number=alert_message.phone_number, message=alert_message.message)
    if metadata is None:
        raise HTTPException(status_code=404, detail="Message not sent")
    return metadata