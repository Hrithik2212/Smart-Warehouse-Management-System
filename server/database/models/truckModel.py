from sqlalchemy import Column, Integer, String , Time , Date , DateTime
try : 
    from server.database.database import Base
except :
    from database import Base # for creating table in db


class Goods(Base):
    __tablename__ = "goods"
    good_id = Column(String , primary_key=True )
    good_identification  = Column(String , nullable =False )

class Truck(Base):
    __tablename__ = "trucks"
    truck_id = Column(Integer, primary_key=True, index=True)
    truck_name = Column(String, index=True)
    truck_mobile = Column(String, unique=True, index=True)
    dock_assigned = Column(Integer , nullable=True )
    truck_priority = Column(Integer , nullable=False)
    arrival_time = Column(DateTime , nullable=False )
    goods = Column(DateTime )