# ===========================
# Account
# ===========================

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
        print("------------------------")
        print("Owner   :", self.owner)
        print("Number  :", self.number)
        print("Balance :", self.balance)


# ===========================
# Account Registry
# ===========================

class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    # -----------------------
    # O(1)
    # -----------------------
    def add(self, account):
        self.accounts[account.number] = account

    # -----------------------
    # O(1)
    # -----------------------
    def find(self, number):
        return self.accounts.get(number)

    # -----------------------
    # Ordered List
    # -----------------------
    def list_all(self):
        for number in sorted(self.accounts):
            self.accounts[number].statement()

    # ===========================
    # Requirement 1
    # Balance Leaderboard
    # ===========================

    def top_by_balance(self, n):

        return sorted(
            self.accounts.values(),
            key=lambda account: account.balance,
            reverse=True
        )[:n]

    # ===========================
    # Requirement 2
    # Binary Search
    # ===========================

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

    # ===========================
    # Requirement 3
    # Recursive Total
    # ===========================

    def total_transactions(self, account):

        def recursive(history):

            if len(history) == 0:
                return 0

            return history[0][1] + recursive(history[1:])

        return recursive(account.history)


# ===========================
# Test Program
# ===========================

registry = AccountRegistry()

a1 = Account("Mohammed", "CBE-1003", 15000)
a2 = Account("Ahmed", "CBE-1001", 9000)
a3 = Account("Ali", "CBE-1005", 21000)
a4 = Account("Fatuma", "CBE-1002", 17000)

registry.add(a1)
registry.add(a2)
registry.add(a3)
registry.add(a4)

# Transactions

a1.deposit(1000)
a1.withdraw(500)
a1.deposit(200)

a2.deposit(400)

a3.withdraw(1000)

a4.deposit(3000)
a4.withdraw(100)

print("\n========== ALL ACCOUNTS ==========")
registry.list_all()

print("\n========== TOP 3 BALANCES ==========")

for account in registry.top_by_balance(3):
    print(account.owner, account.balance)

print("\n========== BINARY SEARCH ==========")

result = registry.find_by_number("CBE-1005")

if result:
    result.statement()

print("\n========== RECURSIVE TOTAL ==========")

print(
    "Total Transaction Amount:",
    registry.total_transactions(a1)
)