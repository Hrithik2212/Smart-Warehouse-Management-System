from sqlalchemy.orm import Session
from sqlalchemy import func , update ,and_, or_, not_
from server.database.models.employeeModel import Employee, EmploymentTypeEnum, UsedEmployeeSet, GenderEnum
from datetime import datetime
import random
from fastapi import HTTPException

def update_resting_employees(session:Session):
    # pass 
    current_time = datetime.now().isoformat()
    stmt = (
        update(Employee)
        .where(
            (Employee.resting_bool == True) &  # Employee is currently resting
            (Employee.resting_until != None)  & # Resting time has passed
            (Employee.resting_until < current_time)
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
        'staff_count' : db.query(Employee).filter(Employee.employment_type == EmploymentTypeEnum.staff).count() ,
        'supervisor_count' : db.query(Employee).filter(Employee.employment_type == EmploymentTypeEnum.supervisor).count()
    }

def check_and_clear_used_set(db: Session):
    count = count_working_employees(db)
    used_staff_count = db.query(func.count(UsedEmployeeSet.id)).join(Employee).filter(
        Employee.employment_type == EmploymentTypeEnum.staff
    ).scalar()
    used_supervisor_count = db.query(func.count(UsedEmployeeSet.id)).join(Employee).filter(
        Employee.employment_type == EmploymentTypeEnum.supervisor
    ).scalar()
    cycle_staff = False 
    cycle_supervisor = False 
    if (0.8 * count['staff_count'] < used_staff_count ):
        # Delete only employees who are not resting
        cycle_staff = True 
        db.query(UsedEmployeeSet).filter(
            and_(
                UsedEmployeeSet.id == Employee.id,
                Employee.employment_type == EmploymentTypeEnum.staff,
                Employee.resting_bool == False  
            )
        ).delete(synchronize_session='fetch')
        db.commit()

    if (0.8 * count['supervisor_count'] < used_supervisor_count):
        # Delete only employees who are not resting
        cycle_supervisor = True 
        db.query(UsedEmployeeSet).filter(
            and_(
                UsedEmployeeSet.id == Employee.id,
                Employee.resting_bool == False
            )
        ).delete(synchronize_session='fetch')
        db.commit()

    return {'cycle_staff':cycle_staff , 'cycle_supervisor':cycle_supervisor}

def assign_employee_team_on_request(db: Session, dock_id: int, team_size: int = 5):
    # Step 1: Update resting employees
    update_resting_employees(db)

    # Step 2: Check if UsedEmployeeSet needs to be cleared
    cycle_check = check_and_clear_used_set(db)
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

    # Step 5: Select staff members
    staff_members = [emp for emp in available_employees if emp.employment_type == EmploymentTypeEnum.staff]
    
    experienced_staff = next((emp for emp in staff_members if emp.experience >= 5), None)
    if not experienced_staff:
        raise HTTPException(status_code=400, detail="No available staff with 5+ years experience")

    heavy_machinery_staff = next((emp for emp in staff_members if emp.heavy_machinery), None)
    if not heavy_machinery_staff:
        raise HTTPException(status_code=400, detail="No available staff with heavy machinery experience")

    # Remove selected staff from the pool
    staff_members = [emp for emp in staff_members if emp not in [experienced_staff, heavy_machinery_staff]]

    # Select remaining staff members to fill the team based on gender ratio
    remaining_staff_count = team_size - 3  # Supervisor + Experienced + Heavy Machinery
    selected_staff = random.sample(staff_members, min(remaining_staff_count, len(staff_members)))

    # Combine all selected employees
    selected_crew = [supervisor, experienced_staff, heavy_machinery_staff] + selected_staff

    # Ensure gender diversity (70% males, 30% females)
    num_males = int(0.7 * team_size)
    num_females = team_size - num_males

    males_in_crew = [emp for emp in selected_crew if emp.gender == GenderEnum.male]
    females_in_crew = [emp for emp in selected_crew if emp.gender == GenderEnum.female]

    # Adjust male/female count to match required ratio
    if len(males_in_crew) < num_males:
        males_needed = num_males - len(males_in_crew)
        extra_males = random.sample([emp for emp in staff_members if emp.gender == GenderEnum.male], males_needed)
        females_in_crew = females_in_crew[:num_females]  # Trim females if necessary
        selected_crew = males_in_crew + extra_males + females_in_crew
    elif len(females_in_crew) < num_females:
        females_needed = num_females - len(females_in_crew)
        extra_females = random.sample([emp for emp in staff_members if emp.gender == GenderEnum.female], females_needed)
        males_in_crew = males_in_crew[:num_males]  # Trim males if necessary
        selected_crew = males_in_crew + females_in_crew + extra_females

    # Add selected crew to UsedEmployeeSet
    for emp in selected_crew:
        db.add(UsedEmployeeSet(id=emp.id))
        db.query(Employee).filter(Employee.id == emp.id).update({"resting_bool": True})
    db.commit()

    return selected_crew


def truncate_used_employee_set(db:Session):
    db.query(UsedEmployeeSet).delete()
    db.commit()
