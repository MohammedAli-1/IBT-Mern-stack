# ============================================
# Account Class
# ============================================

class Account:

    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.balance = balance

        # Transaction history
        self.history = []

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")

        self.balance += amount
        self.history.append(amount)

    def withdraw(self, amount):

        if amount > self.balance:
            print("Insufficient balance")
            return

        self.balance -= amount
        self.history.append(amount)

    def statement(self):

        print("----------------------------")
        print("Owner   :", self.owner)
        print("Number  :", self.number)
        print("Balance :", self.balance)


# ============================================
# Account Registry
# ============================================

class AccountRegistry:

    def __init__(self):
        self.accounts = {}

    # O(1)
    def add(self, account):
        self.accounts[account.number] = account

    # O(1)
    def find(self, number):
        return self.accounts.get(number)

    # Ordered output
    def list_all(self):

        for account in sorted(
                self.accounts.values(),
                key=lambda a: a.number):

            account.statement()

    # =======================================
    # Requirement 1
    # Leaderboard
    # =======================================

    def top_by_balance(self, n):

        return sorted(
            self.accounts.values(),
            key=lambda a: a.balance,
            reverse=True
        )[:n]

    # =======================================
    # Requirement 2
    # Binary Search
    # =======================================

    def binary_search(self, numbers, target):

        left = 0
        right = len(numbers) - 1

        while left <= right:

            mid = (left + right) // 2

            if numbers[mid] == target:
                return mid

            elif target < numbers[mid]:
                right = mid - 1

            else:
                left = mid + 1

        return -1

    def find_by_number(self, number):

        numbers = sorted(self.accounts.keys())

        index = self.binary_search(numbers, number)

        if index == -1:
            return None

        return self.accounts[numbers[index]]

    # =======================================
    # Requirement 3
    # Recursive Total Transactions
    # =======================================

    def total_transactions(self, number):

        account = self.find_by_number(number)

        if account is None:
            return 0

        def recursive(history, index):

            if index == len(history):
                return 0

            return history[index] + recursive(history, index + 1)

        return recursive(account.history, 0)


# ============================================
# Testing
# ============================================

registry = AccountRegistry()

acc1 = Account("Mohammed", "CBE-1003", 12000)
acc2 = Account("Ahmed", "CBE-1001", 25000)
acc3 = Account("Ali", "CBE-1005", 18000)
acc4 = Account("Fatuma", "CBE-1002", 30000)

registry.add(acc1)
registry.add(acc2)
registry.add(acc3)
registry.add(acc4)

# Transactions

acc1.deposit(500)
acc1.deposit(700)
acc1.withdraw(200)

acc2.deposit(1000)
acc2.withdraw(500)

acc3.deposit(300)

acc4.deposit(2000)
acc4.withdraw(1000)

# ============================================
# Leaderboard
# ============================================

print("\nTOP 3 BALANCES\n")

top = registry.top_by_balance(3)

for account in top:
    print(account.owner, account.balance)

# ============================================
# Binary Search
# ============================================

print("\nSEARCH ACCOUNT\n")

account = registry.find_by_number("CBE-1005")

if account:
    account.statement()
else:
    print("Account not found")

# ============================================
# Recursive Total
# ============================================

print("\nTOTAL TRANSACTIONS\n")

total = registry.total_transactions("CBE-1003")

print(total)