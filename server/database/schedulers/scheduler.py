from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime, timedelta
import httpx
import pytz
import asyncio

scheduler = BackgroundScheduler()
kolkata_tz = pytz.timezone('Asia/Kolkata')

async def transfer_old_data():
    async with httpx.AsyncClient() as client:
        try:
            # Call the first endpoint
            response1 = await client.post("http://127.0.0.1:8000/trucks/schedule-trucks/")
            response1.raise_for_status()

        except httpx.HTTPStatusError as e:
            print(f"Error in transferring data: {str(e)}")

def schedule_job():
    # Add a job that runs daily at 12:00 AM
    scheduler.add_job(
        lambda: asyncio.run(transfer_old_data()), 
        CronTrigger(hour=8, minute=0, timezone=kolkata_tz)
    )
    scheduler.start()
def shutdown_scheduler():
    scheduler.shutdown()
