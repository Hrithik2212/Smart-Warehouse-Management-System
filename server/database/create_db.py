from database import engine,Base
from models.userModel import User
from models.employeeModel import Employee

Base.metadata.create_all(bind=engine)
