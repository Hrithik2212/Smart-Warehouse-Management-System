from sqlalchemy import Column, Integer, String , Enum , Boolean , DateTime ,ForeignKey, Table
from sqlalchemy.orm import relationship

try :
    from server.database.models.truckModel import truck_employee_association

except :
    from models.truckModel import truck_employee_association 



try :
    from server.database.database import Base
except :
    from database import Base 
import enum 



class EmploymentTypeEnum(enum.Enum):
    crew = "crew"
    manager = "manager"
    supervisor = "supervisor"
    security = "security"
    admin = "admin"
    driver="driver"

class GenderEnum(enum.Enum):
    male = "male"
    female = "female"


class Employee(Base):
    __tablename__ = 'employees'
    id = Column(Integer,ForeignKey("users.id"), primary_key=True ,unique=True)
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
    dock_assigned=Column(Integer, ForeignKey('docks.docks_id'))
    used_set = relationship("UsedEmployeeSet", back_populates="employee", uselist=False)
    dock  = relationship("Dock", back_populates="employees")
    user = relationship("User", back_populates="employee")
    driver=relationship("Truck", back_populates="driver", uselist=False, cascade="all, delete-orphan")



class UsedEmployeeSet(Base):
    __tablename__ = "used_employees_set"
    id = Column(Integer, ForeignKey('employees.id'), primary_key=True, unique=True)
    employee = relationship("Employee", back_populates="used_set")



