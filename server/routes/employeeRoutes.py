# app/routes/user.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from server.database.database import get_db
from server.database.schemas import  EmployeeCreate , Employee
from server.controllers import employee_controlller

router = APIRouter()


@router.post("/emplyee/" , response_model=Employee)
def create_employee(emp:EmployeeCreate , db:Session=Depends(get_db)):
    return employee_controlller.create_employee(db=db , emp=emp)

@router.get("/employees/{employee_id}", response_model=Employee)
def read_user(employee_id: int, db: Session = Depends(get_db)):
    db_emp = employee_controlller.get_employee(db, id=employee_id)
    if db_emp is None:
        raise HTTPException(status_code=404, detail="Employee Inexistent")
    return db_emp 
