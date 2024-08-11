# app/models/user.py
from sqlalchemy import Column, Integer, String
try : 
    from server.database.database import Base
except :
    from database import Base # for creating table in db


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password=Column(String)
    role=Column(String)
