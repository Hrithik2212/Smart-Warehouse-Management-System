# app/schemas.py
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password:str
    role:str





class LoginUser(BaseModel):
    email:str
    password:str



class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str
    id: int
    name: str
    role: str



class EmploymentTypeEnum(str, Enum):
    crew = "crew"
    manager = "manager"
    supervisor = "supervisor"
    security = "security"
    admin = "admin"
    driver="driver"

class GenderEnum(str, Enum):
    male = "male"
    female = "female"


class Employee(BaseModel):
    id: int
    name: str
    employment_type: EmploymentTypeEnum
    email: str
    mobile: str
    heavy_machinery: bool
    experience: int
    gender: GenderEnum
    attendance_present: bool = Field(default=True)
    resting_bool: bool = Field(default=False)
    resting_until: Optional[datetime] = None

    class Config:
        orm_mode = True
        json_encoders = {
            datetime: lambda v: v.isoformat() if v else None
        }

class User(BaseModel):
    id: int
    name: str
    email: str
    role:str
    employee:Employee

    class Config:
        from_attributes = True
        
class EmployeeCreate(BaseModel):
    name: str
    email :str
    employment_type: EmploymentTypeEnum
    mobile :str 
    heavy_machinery: bool
    experience: int
    gender: GenderEnum
    attendance_present: bool = Field(default=True)
    resting_bool: bool = Field(default=False)
    resting_until: Optional[datetime] = None

    class Config:
        use_enum_values = True
    


class TruckCreate(BaseModel):
    truck_priority: int
    arrival_time: datetime
    truck_number:str
    dock_assigned: Optional[int] = None
    driver_id: int
    supervisor_id:int

    class Config:
        from_attributes = True

class TruckResponse(BaseModel):
    truck_priority: int
    arrival_time: datetime
    dock_assigned: Optional[int] = None
    driver: Employee
    supervisor:Employee

    class Config:
        orm_mode = True