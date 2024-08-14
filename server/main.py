from fastapi import FastAPI
from server.routes import userRoutes
from server.routes import employeeRoutes
from server.routes import truckRoutes
import pytz
from fastapi.middleware.cors import CORSMiddleware
from server.database.schedulers.scheduler import schedule_job, shutdown_scheduler

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

kolkata_tz = pytz.timezone('Asia/Kolkata')
app.include_router(userRoutes.router)
app.include_router(employeeRoutes.router)
app.include_router(truckRoutes.router)


@app.on_event("startup")
async def on_startup():
    # Start the scheduler on startup
    schedule_job()

@app.on_event("shutdown")
async def on_shutdown():
    # Shutdown the scheduler on shutdown
    shutdown_scheduler()








