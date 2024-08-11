import heapq

class StorageItem:
    def __init__(self, id, priority, arrival_time, load_unload_time):
        self.id = id
        self.priority = priority
        self.arrival_time = arrival_time  # Time is in hours (1-24) as arrival time
        self.load_unload_time = load_unload_time  # Time required to load/unload

    def __lt__(self, other):
        # Compare based on priority first, then arrival time if priority is the same
        if self.priority == other.priority:
            return self.arrival_time < other.arrival_time
        return self.priority > other.priority

def schedule_loading_unloading(storage_items):
    # Sort storage items based on arrival time first and priority second
    storage_items.sort(key=lambda x: (x.arrival_time, -x.priority))
    
    # Schedule tasks for a single dock
    schedule = []
    current_time = 0  # Start at midnight (0:00)
    
    for item in storage_items:
        # Wait until the item arrives
        if current_time < item.arrival_time:
            current_time = item.arrival_time
        
        # Schedule the item (non-preemptive)
        schedule.append({
            'Storage ID': item.id,
            'Start Time': current_time,
            'End Time': current_time + item.load_unload_time,
            'Priority': item.priority
        })
        
        # Update the current time after loading/unloading is done
        current_time += item.load_unload_time
    
    return schedule


storage_items = [
    StorageItem(1, 2, 13, 2),  # ID, Priority, Arrival Time (1 PM), Load/Unload Time (2 hours)
    StorageItem(2, 3, 5, 3),   # ID, Priority, Arrival Time (5 AM), Load/Unload Time (3 hours)
    StorageItem(3, 1, 18, 1),  # ID, Priority, Arrival Time (6 PM), Load/Unload Time (1 hour)
    StorageItem(4, 2, 5, 2),   # ID, Priority, Arrival Time (5 AM), Load/Unload Time (2 hours)
    StorageItem(5, 3, 1, 4)    # ID, Priority, Arrival Time (1 AM), Load/Unload Time (4 hours)
]

schedule = schedule_loading_unloading(storage_items)

print("Scheduled Loading/Unloading Order:")
for task in schedule:
    print(f"Storage ID {task['Storage ID']} - Start Time: {task['Start Time']}:00, End Time: {task['End Time']}:00, Priority: {task['Priority']}")
