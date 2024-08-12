import enum
from sqlalchemy import Column, Integer, String  , DateTime , ForeignKey,Table,Enum
from sqlalchemy.orm import relationship
try : 
    from server.database.database import Base
except :
    from database import Base # for creating table in db

truck_employee_association = Table(
    'truck_employee', Base.metadata,
    Column('truck_id', Integer, ForeignKey('trucks.truck_id') , nullable=True),
    Column('employee_id', Integer, ForeignKey('employees.id') , nullable=True)
)



class Goods(Base):
    __tablename__ = "goods"
    good_id = Column(String, primary_key=True)
    good_identification = Column(String, nullable=False)
    truck_id = Column(Integer, ForeignKey('trucks.truck_id'), nullable=False)

    truck = relationship("Truck", back_populates="goods")


class Dock(Base):
    __tablename__ = "docks"
    docks_id = Column(String, primary_key=True)
    employees = relationship("Employee", back_populates="dock", cascade="save-update, merge")
    truck=relationship("Truck", back_populates="dock",uselist=False, cascade="all, delete-orphan")


class State(enum.Enum):
    Pending = "Pending"
    Processing = "Processing"
    Completed = "Completed"


class Truck(Base):
    __tablename__ = "trucks"
    truck_id = Column(Integer, primary_key=True, index=True)
    truck_number=Column(String,unique=True)
    dock_assigned=Column(Integer, ForeignKey('docks.docks_id'), nullable=True)
    dock = relationship("Dock", back_populates="truck")
    truck_priority = Column(Integer, nullable=False)
    arrival_time = Column(DateTime, nullable=True)
    goods = relationship("Goods", back_populates="truck")
    state=Column(Enum(State),default="Pending")
    driver_id = Column(Integer, ForeignKey("employees.id"), unique=True)
    driver = relationship("Employee", foreign_keys=[driver_id],uselist=False, back_populates="trucks_driven")
    
    supervisor_id = Column(Integer, ForeignKey("employees.id"), unique=True)
    supervisor = relationship("Employee", foreign_keys=[supervisor_id], back_populates="trucks_supervised")
    
    


class TruckQueue(Base):
    __tablename__ = "truck_queue"
    queue_id = Column(Integer, primary_key=True, index=True)
    truck_id = Column(Integer, ForeignKey('trucks.truck_id'), nullable=False)
    dock_assigned = Column(Integer, nullable=False)
    scheduled_time = Column(DateTime, nullable=False)
    
    truck = relationship("Truck")