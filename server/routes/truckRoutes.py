from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
from server.database.database import get_db
from server.database.models.truckModel import Truck , Goods
from server.controllers import truck_scehdule_controller

router = APIRouter()

@router.post("/trucks/upload-goods/{truck_id}")
async def upload_goods(truck_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(('.csv', '.xlsx')):
        raise HTTPException(status_code=400, detail="Only CSV or Excel files are accepted")

    # Read file into DataFrame
    if file.filename.endswith('.csv'):
        df = pd.read_csv(file.file)
    else:
        df = pd.read_excel(file.file)

    # Ensure the necessary columns are present
    if not {'good_id', 'good_identification'}.issubset(df.columns):
        raise HTTPException(status_code=400, detail="CSV/Excel file must contain 'good_id' and 'good_identification' columns")

    # Check if the truck exists
    truck = db.query(Truck).filter(Truck.truck_id == truck_id).first()
    if not truck:
        raise HTTPException(status_code=404, detail="Truck not found")

    # Add goods to the truck
    for index, row in df.iterrows():
        good = Goods(
            good_id=row['good_id'],
            good_identification=row['good_identification'],
            truck_id=truck_id
        )
        db.add(good)

    db.commit()

    return {"message": f"Successfully added {len(df)} goods to truck ID {truck_id}"}


@router.post("/trucks/schedule-trucks/")
async def schedule_trucks_endpoint(db: Session = Depends(get_db)):
    scheduled_trucks = truck_scehdule_controller.schedule_trucks(db)
    return {"scheduled_trucks": [truck.truck_id for truck in scheduled_trucks]}