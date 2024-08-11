from database import engine,Base
from models.userModel import User
from models.employeeModel import Employee , UsedEmployeeSet 
from models.truckModel import Truck , Goods

Base.metadata.create_all(bind=engine)
