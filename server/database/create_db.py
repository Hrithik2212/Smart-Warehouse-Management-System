from database import engine,Base
from models.userModel import User

Base.metadata.create_all(bind=engine)
