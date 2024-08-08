# app/schemas.py
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
from datetime import time

class UserCreate(BaseModel):
    name: str
    email: str

class User(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True



class EmploymentTypeEnum(str, Enum):
    staff = "staff"
    manager = "manager"
    supervisor = "supervisor"
    security = "security"
    admin = "admin"

class GenderEnum(str, Enum):
    male = "male"
    female = "female"

class Employee(BaseModel):
    name: str
    employment_type: EmploymentTypeEnum
    email : str
    mobile : str 
    heavy_machinery: bool
    experience: int
    gender: GenderEnum
    attendance_present: bool = Field(default=True)
    resting_bool: bool = Field(default=False)
    resting_until: Optional[time] = None

class EmployeeCreate(BaseModel):
    id: int
    name: str
    email :str
    employment_type: EmploymentTypeEnum
    mobile :str 
    heavy_machinery: bool
    experience: int
    gender: GenderEnum
    attendance_present: bool = Field(default=True)
    resting_bool: bool = Field(default=False)
    resting_until: Optional[time] = None

    class Config:
        use_enum_values = True
    
class AlertMessage(BaseModel):
    phone_number: str
    message: str