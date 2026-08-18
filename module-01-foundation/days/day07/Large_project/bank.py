# ===========================
# Singleton Pattern
# ===========================

class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# ===========================
# Observer Pattern
# ===========================

class SMSAlert:
    def update(self, message):
        print(f"[SMS] {message}")


class AuditLog:
    def update(self, message):
        print(f"[AUDIT] {message}")


# ===========================
# Account
# ===========================

class Account:

    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.__balance = balance

        self._observers = []

        # Stack (LIFO)
        self.history = []

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        self.__balance = value

    # -------------------
    # Observer Methods
    # -------------------

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.update(message)

    # -------------------
    # Transactions
    # -------------------

    def deposit(self, amount):

        if amount <= 0:
            raise ValueError("Deposit must be positive")

        self.balance += amount

        # Push onto stack
        self.history.append(("deposit", amount))

        self._notify(
            f"{self.owner} deposited {amount}. Balance = {self.balance}"
        )

    def withdraw(self, amount):

        if amount <= self.balance:

            self.balance -= amount

            # Push onto stack
            self.history.append(("withdraw", amount))

            self._notify(
                f"{self.owner} withdrew {amount}. Balance = {self.balance}"
            )

        else:
            print("Insufficient balance")

    # -------------------
    # Undo
    # -------------------

    def undo_last(self):

        if not self.history:
            print("Nothing to undo.")
            return

        transaction, amount = self.history.pop()

        if transaction == "deposit":
            self.balance -= amount

        elif transaction == "withdraw":
            self.balance += amount

        print(f"Undo: {transaction} {amount}")

    def statement(self):

        print("-" * 40)
        print("Type    : Account")
        print("Owner   :", self.owner)
        print("Number  :", self.number)
        print("Balance :", self.balance)


# ===========================
# Savings
# ===========================

class SavingsAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)

        self.rate = BankConfig().interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        super().statement()
        print("Rate    :", self.rate)


# ===========================
# Current
# ===========================

class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)

        self.overdraft = BankConfig().overdraft_limit

    def withdraw(self, amount):

        if amount <= self.balance + self.overdraft:

            self.balance -= amount

            self.history.append(("withdraw", amount))

            self._notify(
                f"{self.owner} withdrew {amount}. Balance = {self.balance}"
            )

        else:
            print("Overdraft limit exceeded.")

    def statement(self):
        super().statement()
        print("Overdraft:", self.overdraft)


# ===========================
# Factory
# ===========================

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)

        else:
            raise ValueError("Unknown account type")


# ===========================
# Account Registry (Dictionary)
# ===========================

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
        for number in sorted(self.accounts):
            self.accounts[number].statement()


# ===========================
# Main Program
# ===========================

sms = SMSAlert()
audit = AuditLog()

registry = AccountRegistry()

acc1 = AccountFactory.create(
    "savings",
    "Mohammed",
    "CBE-1001",
    10000
)

acc2 = AccountFactory.create(
    "current",
    "Ahmed",
    "CBE-1002",
    5000
)

acc1.subscribe(sms)
acc1.subscribe(audit)

acc2.subscribe(sms)
acc2.subscribe(audit)

registry.add(acc1)
registry.add(acc2)

print("\n--- ALL ACCOUNTS ---")
registry.list_all()

print("\n--- FIND ACCOUNT (O(1)) ---")

account = registry.find("CBE-1001")

if account:
    account.statement()

print("\n--- TRANSACTIONS ---")

acc1.deposit(1000)
acc1.withdraw(500)
acc1.add_interest()

acc2.withdraw(5500)
acc2.deposit(300)

print("\n--- HISTORY STACK ---")
print(acc1.history)

print("\n--- UNDO LAST ---")

acc1.undo_last()

acc1.statement()

print("\n--- HISTORY AFTER UNDO ---")
print(acc1.history)