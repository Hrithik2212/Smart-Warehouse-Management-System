import json
import random
from datetime import datetime, timedelta

# Helper function to generate random phone numbers
def generate_phone():
    return f"+1{random.randint(100, 999):03d}{random.randint(100, 999):03d}{random.randint(1000, 9999):04d}"

# Helper function to generate random email
def generate_email(name):
    return f"{name.lower().replace(' ', '.')}@example.com"

# Generate employee data
employees = []
employee_id = 1
male_count = 0
female_count = 0
heavy_machinery_count = 0
crew_experience_over_5 = 0

employment_types = {
    "manager": 2,
    "supervisor": 5,
    "security": 2,
    "admin": 1,
    "crew": 31
}

for emp_type, count in employment_types.items():
    for _ in range(count):
        gender = random.choice(["male", "female"])
        if gender == "male":
            male_count += 1
            first_name = random.choice(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])
        else:
            female_count += 1
            first_name = random.choice(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Margaret", "Susan", "Dorothy", "Lisa"])
        
        last_name = random.choice(["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"])
        name = f"{first_name} {last_name}"
        
        heavy_machinery = random.random() < 0.35
        if heavy_machinery:
            heavy_machinery_count += 1
        
        if emp_type == "crew":
            experience = random.randint(1, 10)
            if experience > 5:
                crew_experience_over_5 += 1
        else:
            experience = random.randint(5, 15)
        
        employee = {
            "id": employee_id,
            "name": name,
            "email": generate_email(name),
            "mobile": generate_phone(),
            "employment_type": emp_type,
            "heavy_machinery": heavy_machinery,
            "experience": experience,
            "gender": gender,
            "attendance_present": True,
            "resting_bool": False,
            "resting_until": None
        }
        employees.append(employee)
        employee_id += 1

# Adjust gender ratio if needed
while male_count / len(employees) > 0.6:
    for emp in employees:
        if emp["gender"] == "male":
            emp["gender"] = "female"
            male_count -= 1
            female_count += 1
            break

# Adjust heavy machinery count if needed
while heavy_machinery_count / len(employees) < 0.35:
    for emp in employees:
        if not emp["heavy_machinery"]:
            emp["heavy_machinery"] = True
            heavy_machinery_count += 1
            break

# Adjust crew experience if needed
while crew_experience_over_5 < 10:
    for emp in employees:
        if emp["employment_type"] == "crew" and emp["experience"] <= 5:
            emp["experience"] = random.randint(6, 10)
            crew_experience_over_5 += 1
            break

# Write to JSON file
with open('employees.json', 'w') as f:
    json.dump(employees, f, indent=2)

print(f"Total employees: {len(employees)}")
print(f"Male to Female ratio: {male_count}:{female_count}")
print(f"Employees with heavy machinery skills: {heavy_machinery_count}")
print(f"Staff with more than 5 years experience: {crew_experience_over_5}")