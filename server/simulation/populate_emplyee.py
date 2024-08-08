import json
import sys
import os

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database.models.employeeModel import Employee
from database.database import Base

# Database connection string - replace with your actual database URL
DATABASE_URL  = "sqlite:///./db.sqlite3"


# Create engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def delete_existing_employees(db):
    db.query(Employee).delete()
    db.commit()

def create_employee(db, emp_data):
    db_employee = Employee(
        id=emp_data['id'],
        name=emp_data['name'],
        email=emp_data['email'],
        mobile=emp_data['mobile'],
        employment_type=emp_data['employment_type'],
        heavy_machinery=emp_data['heavy_machinery'],
        experience=emp_data['experience'],
        gender=emp_data['gender'],
        attendance_present=emp_data['attendance_present'],
        resting_bool=emp_data['resting_bool'],
        resting_until=emp_data['resting_until']
    )
    db.add(db_employee)
    return db_employee

def populate_database():
    db = SessionLocal()
    try:
        # Delete existing employees
        print("Deleting existing employees...")
        delete_existing_employees(db)
        
        # Read JSON file
        json_path = os.path.join(os.path.dirname(__file__), 'employees.json')
        with open(json_path, 'r') as f:
            employees_data = json.load(f)
        
        print(f"Populating database with {len(employees_data)} employees...")
        for emp_data in employees_data:
            create_employee(db, emp_data)
        
        db.commit()
        print("Database population complete!")
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    populate_database()