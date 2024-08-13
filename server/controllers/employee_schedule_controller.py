from sqlalchemy.orm import Session
from sqlalchemy import func , update ,and_, or_, not_
from server.database.models.employeeModel import Employee, EmploymentTypeEnum, UsedEmployeeSet, GenderEnum
from server.database.models.truckModel import Dock
from datetime import datetime
import random
from fastapi import HTTPException

def update_resting_employees(session:Session):
    # pass 
    current_time = datetime.now().isoformat()
    stmt = (
        update(Employee)
        .where(
            (Employee.resting_bool == True) #&  # Employee is currently resting
            #(Employee.resting_until != None)  & # Resting time has passed
            #(Employee.resting_until < current_time)
        )
        .values(
            resting_bool=False,  # Set resting to False
            resting_until=None  # Clear the resting_until time
        )
    )
    result = session.execute(stmt)
    session.commit()
    return {'res' : result.rowcount}


def count_working_employees(db :Session) :
    # pass
    return {
        'crew_count' : db.query(Employee).filter(Employee.employment_type == EmploymentTypeEnum.crew).count() ,
        'supervisor_count' : db.query(Employee).filter(Employee.employment_type == EmploymentTypeEnum.supervisor).count()
    }

def check_and_clear_used_set(db: Session):
    count = count_working_employees(db)
    
    # Query the IDs of crew members to delete
    used_crew_ids = db.query(UsedEmployeeSet.id).join(Employee).filter(
        Employee.employment_type == EmploymentTypeEnum.crew,
        Employee.resting_bool == False  
    ).all()

    # Query the IDs of supervisors to delete
    used_supervisor_ids = db.query(UsedEmployeeSet.id).join(Employee).filter(
        Employee.employment_type == EmploymentTypeEnum.supervisor,
        Employee.resting_bool == False  
    ).all()

    cycle_crew = False 
    cycle_supervisor = False 

    # If crew members need to be cycled
    if (0.8 * count['crew_count'] < len(used_crew_ids)):
        cycle_crew = True 
        db.query(UsedEmployeeSet).filter(
            UsedEmployeeSet.id.in_([id[0] for id in used_crew_ids])
        ).delete(synchronize_session=False)
        db.commit()

    # If supervisors need to be cycled
    if (0.8 * count['supervisor_count'] < len(used_supervisor_ids)):
        cycle_supervisor = True 
        db.query(UsedEmployeeSet).filter(
            UsedEmployeeSet.id.in_([id[0] for id in used_supervisor_ids])
        ).delete(synchronize_session=False)
        db.commit()


    return {'cycle_crew':cycle_crew , 'cycle_supervisor':cycle_supervisor}

def assign_employee_team_on_request(db: Session, dock_id: int, team_size: int = 5):
    dock=db.query(Dock).filter(Dock.docks_id==dock_id).first()
    # Step 1: Update resting employees
    update_resting_employees(db)

    # Step 2: Check if UsedEmployeeSet needs to be cleared
    try:
       cycle_check = check_and_clear_used_set(db)
    except Exception as e:
        print(e)
        raise
    print(cycle_check)

    # Step 3: Query available employees
    available_employees = db.query(Employee).filter(
        and_(
            Employee.resting_bool == False,
            Employee.attendance_present == True,
            ~Employee.used_set.has(),
        )
    ).all()
    

    # Step 4: Select supervisor
    supervisor = next((emp for emp in available_employees if emp.employment_type == EmploymentTypeEnum.supervisor), None)
   
    if not supervisor:
        raise HTTPException(status_code=400, detail="No available supervisor")

    # Step 5: Select crew members
    crew_members = [emp for emp in available_employees if emp.employment_type == EmploymentTypeEnum.crew]
    
    experienced_crew = next((emp for emp in crew_members if emp.experience >= 5 and emp.id!=supervisor.id), None)
    if not experienced_crew:
        raise HTTPException(status_code=400, detail="No available crew with 5+ years experience")


    heavy_machinery_crew = next((emp for emp in crew_members if emp.heavy_machinery and emp.id!=experienced_crew.id and emp.id!=supervisor.id), None)
    if not heavy_machinery_crew:
        raise HTTPException(status_code=400, detail="No available crew with heavy machinery experience")

    # Remove selected crew from the pool
    crew_members = [emp for emp in crew_members if emp not in [experienced_crew, heavy_machinery_crew,supervisor]]
    
    # Select remaining crew members to fill the team based on gender ratio
    remaining_crew_count = team_size - 3  # Supervisor + Experienced + Heavy Machinery
    
    selected_crew = random.sample(crew_members, min(remaining_crew_count, len(crew_members)))
    

    # Combine all selected employees
    selected_crew = [supervisor, experienced_crew, heavy_machinery_crew] + selected_crew
    
    

    # Ensure gender diversity (70% males, 30% females)
    num_males = int(0.7 * team_size)
    num_females = team_size - num_males

    males_in_crew = [emp for emp in selected_crew if emp.gender == GenderEnum.male]
    females_in_crew = [emp for emp in selected_crew if emp.gender == GenderEnum.female]

    

    # Adjust male/female count to match required ratio
    if len(males_in_crew) < num_males:
        try:
            males_needed = num_males - len(males_in_crew)
            extra_males = random.sample([emp for emp in crew_members if emp.gender == GenderEnum.male], males_needed)
            females_in_crew = females_in_crew[:num_females]  # Trim females if necessary
            selected_crew = males_in_crew + extra_males + females_in_crew
        except:
            pass
    elif len(females_in_crew) < num_females:
        try:
            females_needed = num_females - len(females_in_crew)
            extra_females = random.sample([emp for emp in crew_members if emp.gender == GenderEnum.female], females_needed)
            males_in_crew = males_in_crew[:num_males]  # Trim males if necessary
            selected_crew = males_in_crew + females_in_crew + extra_females
        except:
            pass

    # Add selected crew to UsedEmployeeSet
    print(selected_crew)
 
    for emp in selected_crew:
        db.add(UsedEmployeeSet(id=emp.id))
        db.query(Employee).filter(Employee.id == emp.id).update({"resting_bool": True})

    dock.employees=selected_crew
    db.add(dock)
    db.commit()



    return selected_crew


def truncate_used_employee_set(db:Session):
    db.query(UsedEmployeeSet).delete()
    db.commit()
