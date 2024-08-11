from sqlalchemy import Column, Integer, String , Enum , Boolean , DateTime ,ForeignKey
from sqlalchemy.orm import relationship
try :
    from server.database.database import Base
except :
    from database import Base # for creatinng db 
import enum 


class EmploymentTypeEnum(enum.Enum):
    staff = "staff"
    manager = "manager"
    supervisor = "supervisor"
    security = "security"
    admin = "admin"

class GenderEnum(enum.Enum):
    male = "male"
    female = "female"


class Employee(Base):
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True ,unique=True)
    name = Column(String, nullable=False)
    email = Column(String ,  nullable=False)
    mobile = Column(String , nullable=False,)
    employment_type = Column(Enum(EmploymentTypeEnum), nullable=False)
    heavy_machinery = Column(Boolean, nullable=False)
    experience = Column(Integer, nullable=False)
    gender = Column(Enum(GenderEnum), nullable=False)
    attendance_present = Column(Boolean, default=True, nullable=False)
    resting_bool = Column(Boolean, default=False, nullable=False)
    resting_until = Column(DateTime, nullable=True)
    used_set = relationship("UsedEmployeeSet", back_populates="employee", uselist=False)

class UsedEmployeeSet(Base):
    __tablename__ = "used_employees_set"
    id = Column(Integer, ForeignKey('employees.id'), primary_key=True, unique=True)
    employee = relationship("Employee", back_populates="used_set")


