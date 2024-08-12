import requests
import json
from datetime import datetime, timedelta
import random

# Base URL of the API
base_url = "http://127.0.0.1:8000/"

# Endpoint to get all users
get_users_url = f"{base_url}/user/all"

# Endpoint to create trucks
create_truck_url = f"{base_url}/createtrucks/"

# Endpoint to truncate trucks table
truncate_trucks_url = f"{base_url}/trucks/truncate_trucks"

# Step 1: Truncate the trucks table
response = requests.get(truncate_trucks_url)
if response.status_code == 200:
    print("Trucks table truncated successfully.")
else:
    print(f"Failed to truncate trucks table: {response.status_code} - {response.text}")
    exit()

# Step 2: Fetch all users
response = requests.get(get_users_url)
if response.status_code != 200:
    print(f"Failed to fetch users: {response.status_code} - {response.text}")
    exit()

users = response.json()

# Step 3: Filter drivers
drivers = [user for user in users if user['employee']['employment_type'] == 'driver']

if not drivers:
    print("No drivers found.")
    exit()

# Step 4: Create trucks and store invoices
invoices = []
for driver in drivers:
    # Set arrival time to a random time tomorrow
    tomorrow = datetime.now() + timedelta(days=1)
    random_time = datetime(
        year=tomorrow.year,
        month=tomorrow.month,
        day=tomorrow.day,
        hour=random.randint(0, 23),
        minute=random.randint(0, 59),
        second=random.randint(0, 59)
    )
    arrival_time = random_time.isoformat()

    truck_data = {
        "truck_number": f"TRUCK-{driver['id']}",
        "truck_priority": random.randint(1, 5),  # Assuming priority is between 1 and 5
        "driver_id": driver['id'],
        "dock_assigned": None,  # Assuming no dock is assigned initially
        "arrival_time": arrival_time  # Set the random arrival time
    }

    response = requests.post(create_truck_url, json=truck_data)
    if response.status_code == 200:
        print(f"Truck created successfully for driver {driver['name']}.")
        invoices.append(response.json())  # Append the created truck invoice
    else:
        print(f"Failed to create truck for driver {driver['name']}: {response.status_code} - {response.text}")

# Step 5: Save the invoices to a JSON file
with open('invoices.json', 'w') as f:
    json.dump(invoices, f, indent=2)

print(f"Created {len(invoices)} truck invoices saved to 'invoices.json'.")
