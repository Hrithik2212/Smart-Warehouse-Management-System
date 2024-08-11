# app/models/user.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

try : 
    from server.database.database import Base
    from server.database.models.employeeModel import Employee
except :
    from database import Base # for creating table in db
    from models.employeeModel import Employee


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True) #,autoincrement=True,)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password=Column(String)
    role=Column(String)

    employee = relationship("Employee", back_populates="user", uselist=False, cascade="all, delete-orphan")
