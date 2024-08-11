import requests
import json
from datetime import datetime
# Assume the base URL is "localhost:8000"
base_url = "http://127.0.0.1:8000/"

# Load the employee data from the JSON file
with open("employees.json", "r") as f:
    employee_data = json.load(f)

# Truncate the employee table
response = requests.post(f"{base_url}/truncate_employee/")
if response.status_code == 200:
    print("Existing employees deleted successfully.")
else:
    print(f"Error deleting existing employees: {response.status_code} - {response.text}")

# Create the employees using the create_employee() endpoint
for employee in employee_data:
    employee['resting_bool'] = True
    employee['resting_until'] = datetime.now().isoformat()
    response = requests.post(f"{base_url}/employee/", json=employee)
    if response.status_code == 200:
        print(f"Employee {employee['name']} created successfully.")
    else:
        print(f"Error creating employee {employee['name']}: {response.status_code} - {response.text}")