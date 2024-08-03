from fastapi import FastAPI
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import create_engine



scheduler = BackgroundScheduler()

# Define the timezone


def transfer_old_data():
    db = SessionLocal()
    try:
        # Define the cutoff time
        cutoff_time = datetime.utcnow() - timedelta(days=1)

        # Move data older than 24 hours
        old_records = db.query(MainTable).filter(MainTable.timestamp < cutoff_time).all()
        for record in old_records:
            # Insert record into history table
            history_record = HistoryTable(id=record.id, data=record.data, timestamp=record.timestamp)
            db.add(history_record)
            db.delete(record)
        
        db.commit()
    finally:
        db.close()

def schedule_job():
    now = datetime.now(kolkata_tz)
    # Calculate the next run time
    next_run_time = now.replace(hour=12, minute=0, second=0, microsecond=0)
    if now > next_run_time:
        next_run_time += timedelta(days=1)
    
    # Add a job that runs daily at 12 PM
    scheduler.add_job(
        transfer_old_data, 
        'interval', 
        days=1, 
        start_date=next_run_time
    )

    # Check if we missed the 12 PM run and run the job immediately
    if now > next_run_time:
        transfer_old_data()

    scheduler.start()

@app.on_event("startup")
async def on_startup():
    schedule_job()

@app.on_event("shutdown")
def on_shutdown():
    scheduler.shutdown()
