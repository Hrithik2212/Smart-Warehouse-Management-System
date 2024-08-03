from fastapi import FastAPI
from server.routes import userRoutes
import pytz


app = FastAPI()

kolkata_tz = pytz.timezone('Asia/Kolkata')
app.include_router(userRoutes.router)







