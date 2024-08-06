from sqlalchemy import Column, Integer, String , Enum , Boolean , Time
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
    resting_until = Column(Time, nullable=True)


