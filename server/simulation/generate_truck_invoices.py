import requests
import json
from datetime import datetime
import random 

# Base URL of the API
base_url = "http://127.0.0.1:8000/"

# Endpoint to get all users
get_users_url = f"{base_url}/user/all"

# Endpoint to create trucks
# create_truck_url = f"{base_url}/createtrucks/"

# Step 1: Fetch all users
response = requests.get(get_users_url)
if response.status_code != 200:
    print(f"Failed to fetch users: {response.status_code} - {response.text}")
    exit()

users = response.json()

# Step 2: Filter drivers
drivers = [user for user in users if user['employee']['employment_type'] == 'driver']

if not drivers:
    print("No drivers found.")
    exit()

# Step 3: Create trucks and store invoices
invoices = []
for driver in drivers:
    truck_data = {
        "truck_number": f"TRUCK-{driver['id']}",
        "truck_priority": random.randint(1, 5),  # Assuming priority is between 1 and 5
        "driver_id": driver['id'],
        "dock_assigned": None  # Assuming no dock is assigned initially
    }
    invoices.append(response.json())  # Append the created truck invoice

# Step 4: Save the invoices to a JSON file
with open('invoices.json', 'w') as f:
    json.dump(invoices, f, indent=2)

print(f"Created {len(invoices)} truck invoices saved to 'invoices.json'.")
