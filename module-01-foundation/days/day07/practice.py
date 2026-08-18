# -----------------------------
# 1. List Index
# Big-O: O(1)
# Why?

# -----------------------------

numbers = [10, 20, 30, 40, 50]
print(numbers[3])


# -----------------------------
# 2. Single Loop
# Big-O: O(n)
# Why?
# Every element is visited exactly once.
# -----------------------------

numbers = [1, 2, 3, 4, 5]

for num in numbers:
    print(num)


# -----------------------------
# 3. Nested Loop
# Big-O: O(n²)
# Why?
# For every outer iteration, the inner loop runs again.
# -----------------------------

numbers = [1, 2, 3, 4]

for i in numbers:
    for j in numbers:
        print(i, j)


# -----------------------------
# 4. Dictionary Lookup
# Big-O: O(1)
# Why?
# Python dictionaries use hash tables.
# -----------------------------

accounts = {
    "CBE-1": "Mohammed",
    "CBE-2": "Ahmed"
}

print(accounts["CBE-2"])


# -----------------------------
# 5. Binary Search
# Big-O: O(log n)
# Why?
# Each comparison cuts the search space in half.
# -----------------------------

def binary_search(arr, target):

    left = 0
    right = len(arr) - 1

    while left <= right:

        mid = (left + right) // 2

        if arr[mid] == target:
            return mid

        elif arr[mid] < target:
            left = mid + 1

        else:
            right = mid - 1

    return -1


numbers = list(range(1, 101))

print(binary_search(numbers, 75))

import time

SIZE = 100000

# Create fake account numbers

account_list = []
account_dict = {}

for i in range(SIZE):
    number = f"CBE-{i}"
    account_list.append(number)
    account_dict[number] = i


target = f"CBE-{SIZE-1}"

# ------------------------
# List Search
# ------------------------

start = time.perf_counter()

found = target in account_list

end = time.perf_counter()

print("List Search Time")
print(end - start)


# ------------------------
# Dictionary Search
# ------------------------

start = time.perf_counter()

found = target in account_dict

end = time.perf_counter()

print("Dictionary Search Time")
print(end - start)
# stack
class Stack:

    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop()

    def peek(self):
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0


stack = Stack()

names = ["Mohammed", "Ahmed", "Ali", "Omar"]

for name in names:
    stack.push(name)

print("Reversed")

while not stack.is_empty():
    print(stack.pop())
#4 queue
from collections import deque

queue = deque()

queue.append("Mohammed")
queue.append("Ahmed")
queue.append("Ali")
queue.append("Omar")
queue.append("Fatuma")

print("Serving Customers")

while queue:
    print("Serving:", queue.popleft())    
#5 Single linked List
class Node:

    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:

    def __init__(self):
        self.head = None

    def push_front(self, data):

        new_node = Node(data)

        new_node.next = self.head

        self.head = new_node

    def print_all(self):

        current = self.head

        while current is not None:
            print(current.data)
            current = current.next


ll = LinkedList()

ll.push_front("Mohammed")
ll.push_front("Ahmed")
ll.push_front("Ali")
ll.push_front("Omar")

ll.print_all()
