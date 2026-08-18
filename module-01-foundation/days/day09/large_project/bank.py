from collections import deque

# =====================================
# Account
# =====================================

class Account:

    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        self.balance += amount
        self.history.append(("Deposit", amount))

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self.history.append(("Withdraw", amount))
        else:
            print("Insufficient Balance")

    def statement(self):
        print("---------------------------")
        print("Owner   :", self.owner)
        print("Number  :", self.number)
        print("Balance :", self.balance)


# =====================================
# Account Registry
# =====================================

class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    def add(self, account):
        self.accounts[account.number] = account

    def find(self, number):
        return self.accounts.get(number)

    def list_all(self):
        for account in sorted(self.accounts.values(), key=lambda a: a.number):
            account.statement()

    def top_by_balance(self, n):
        return sorted(
            self.accounts.values(),
            key=lambda a: a.balance,
            reverse=True
        )[:n]

    # --------------------------
    # Binary Search
    # --------------------------

    def binary_search(self, numbers, target):

        left = 0
        right = len(numbers) - 1

        while left <= right:

            mid = (left + right) // 2

            if numbers[mid] == target:
                return mid

            elif numbers[mid] < target:
                left = mid + 1

            else:
                right = mid - 1

        return -1

    def find_by_number(self, number):

        numbers = sorted(self.accounts.keys())

        index = self.binary_search(numbers, number)

        if index == -1:
            return None

        return self.accounts[numbers[index]]

    # --------------------------
    # Recursive Total
    # --------------------------

    def total_transactions(self, number):

        account = self.find(number)

        if account is None:
            return 0

        def recursive(history, index):

            if index == len(history):
                return 0

            return history[index][1] + recursive(history, index + 1)

        return recursive(account.history, 0)


# =====================================
# Branch Tree
# =====================================

class Branch:

    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):

        total = sum(account.balance for account in self.accounts)

        for child in self.children:
            total += child.total_balance()

        return total


# =====================================
# Breadth First Search (Graph)
# =====================================

def bfs(transfers, start):

    visited = set()

    queue = deque([start])

    while queue:

        current = queue.popleft()

        if current not in visited:

            visited.add(current)

            for neighbor in transfers.get(current, []):

                if neighbor not in visited:
                    queue.append(neighbor)

    return visited


# =====================================
# Main Program
# =====================================

registry = AccountRegistry()

a1 = Account("Mohammed", "CBE-1001", 15000)
a2 = Account("Ahmed", "CBE-1002", 10000)
a3 = Account("Ali", "CBE-1003", 12000)
a4 = Account("Fatuma", "CBE-1004", 18000)
a5 = Account("Omar", "CBE-1005", 9000)

registry.add(a1)
registry.add(a2)
registry.add(a3)
registry.add(a4)
registry.add(a5)

# Transactions

a1.deposit(1000)
a1.withdraw(500)

a2.deposit(800)

a3.withdraw(1000)

# =====================================
# Branch Tree
# =====================================

head_office = Branch("Head Office")

north_region = Branch("North Region")
south_region = Branch("South Region")

harar = Branch("Harar Branch")
addis = Branch("Addis Branch")
dire = Branch("Dire Dawa Branch")

head_office.add_child(north_region)
head_office.add_child(south_region)

north_region.add_child(harar)
south_region.add_child(addis)
south_region.add_child(dire)

harar.add_account(a1)
harar.add_account(a2)

addis.add_account(a3)

dire.add_account(a4)
dire.add_account(a5)

print("\n========== TOTAL BRANCH BALANCE ==========")
print(head_office.total_balance())

# =====================================
# Balance Leaderboard
# =====================================

print("\n========== TOP 3 BALANCES ==========")

for account in registry.top_by_balance(3):
    print(account.owner, account.balance)

# =====================================
# Binary Search
# =====================================

print("\n========== SEARCH ==========")

result = registry.find_by_number("CBE-1003")

if result:
    result.statement()

# =====================================
# Recursive Total Transactions
# =====================================

print("\n========== TRANSACTION TOTAL ==========")

print(
    registry.total_transactions("CBE-1001")
)

# =====================================
# Transfers Graph
# =====================================

transfers = {

    "CBE-1001": ["CBE-1002", "CBE-1003"],

    "CBE-1002": ["CBE-1004"],

    "CBE-1003": ["CBE-1005"],

    "CBE-1004": [],

    "CBE-1005": []
}

print("\n========== BFS ==========")

reachable = bfs(transfers, "CBE-1001")

print(reachable)