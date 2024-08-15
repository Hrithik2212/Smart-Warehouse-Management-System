from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, File, Request, UploadFile, HTTPException
from sqlalchemy.orm import Session
import pandas as pd
from sqlalchemy import func
from server.database.database import get_db
from server.database.models.employeeModel import Employee
from server.database.models.truckModel import Truck , Goods,Dock,TruckQueue
from server.controllers import truck_scehdule_controller
from server.controllers.auth import verify_password,verify_access_token,authenticate_request
from server.controllers import truck_controller,dock_allocator
from server.database.schemas import TruckCreate,TruckResponse,DockResponse,TruckUpdateRequest
from typing import List
from typing import Optional,List
from pytz import timezone


router = APIRouter()


def get_dock_allocator(db: Session = Depends(get_db)):
    return dock_allocator.DockAllocator(db)

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
async def schedule_trucks_endpoint(db: Session = Depends(get_db),dock_allocator: dock_allocator.DockAllocator = Depends(get_dock_allocator)):
    return truck_scehdule_controller.schedule_trucks(db,dock_allocator)


@router.post("/createtrucks/", response_model=TruckResponse)
def create_truck(truck: TruckCreate, db: Session = Depends(get_db)):
    db_driver=db.query(Employee).filter(Employee.id==truck.driver_id).first()
    if db_driver:
       return  truck_controller.create_trucks(db,truck)
    else:
        raise HTTPException(status_code=404, detail="Driver not found")

@router.get("/gettruck/", response_model=List[TruckResponse])
@authenticate_request
async def get_truck(request: Request, db: Session = Depends(get_db)):
    driver_id=request.state.user.get("id")
    db_driver=db.query(Truck).filter(Truck.driver_id==driver_id)
    if db_driver:
       return db_driver
    else:
        raise HTTPException(status_code=404, detail="Driver not found")


@router.get("/getalltruck/", response_model=List[TruckResponse])
@authenticate_request
async def get_all_truck(request: Request, db: Session = Depends(get_db)):
    role=request.state.user.get("role")
    if role=="manager" or role=="admin":
       now = datetime.now()
       today = now.date()
       
       return db.query(Truck).filter(
           func.date(Truck.arrival_time) == today
       ).all()
    else:
        raise HTTPException(status_code=403, detail="Unautherized")



@router.get("/getassignedtrucks",response_model=List[DockResponse])
@authenticate_request
async def get_assigned_trucks_crew(request: Request, db: Session = Depends(get_db)):
    id=request.state.user.get("id")
    employee=db.query(Employee).filter(Employee.employment_type=="manager").first()
    trucks=db.query(Dock).join(Employee).filter(Employee.id == id).all()
    for truck in trucks:
        truck.employees.append(employee)
    return trucks


@router.get("/createdock/{docks_id}", response_model=DockResponse)
def create_dock(docks_id:int,db: Session = Depends(get_db)):
    return truck_controller.create_dock(db,docks_id)


@router.get("/getdock/{docks_id}", response_model=DockResponse)
def get_dock(docks_id:int,db: Session = Depends(get_db)):
    print(datetime.now() + timedelta(seconds=20))

    return truck_controller.get_dock(db,docks_id)

@router.get("/getalldocks/", response_model=List[DockResponse])
@authenticate_request
async def get_all_dock(request: Request,db: Session = Depends(get_db)):
    role=request.state.user.get("role")
    if role=="manager":
       return truck_controller.get_all_dock(db)
    else:
        raise HTTPException(status_code=403, detail="Unautherized")






def truck_allocator(dock_allocator):
    try:
        dock_allocator.allocate_trucks()
        return True
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 
    

@router.get("/assignnewtrucks/{docks_id}")
def truncate_dock(docks_id:int,dock_allocator: dock_allocator.DockAllocator = Depends(get_dock_allocator)):
    try:
      
        dock_allocator.release_dock(docks_id)
        truck_allocator(dock_allocator)
        return True
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Unable to release") 



@router.post("/createinvoice/")
async def update_timedate(request:TruckUpdateRequest, db: Session = Depends(get_db)):
    try:
        truck = db.query(Truck).filter(Truck.truck_number==request.truck_id).first()
        local_tz = timezone("Asia/Kolkata")
        truck.arrival_time = request.timedate.astimezone(local_tz)
        db.commit()
        return {"message": f"Timedate updated successfully to {request.timedate} for all trucks."}
    except:
        raise HTTPException(status_code=400, detail="Unable to update time")
    




@router.get("/trucks/truncate_trucks")
def truncate_truck_invoices(db: Session = Depends(get_db)):
    return truck_controller.truncate_truck_invoices(db)