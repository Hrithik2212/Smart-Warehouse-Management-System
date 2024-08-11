from fastapi import FastAPI
from server.routes import userRoutes
from server.routes import employeeRoutes
import pytz


app = FastAPI()

kolkata_tz = pytz.timezone('Asia/Kolkata')
app.include_router(userRoutes.router)
app.include_router(employeeRoutes.router)








