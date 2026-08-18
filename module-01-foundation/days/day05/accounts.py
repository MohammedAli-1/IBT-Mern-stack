class Account:
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.number = number
        self.__balance = balance

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Must be positive")

        self.__balance += amount

    def withdraw(self, amount):
        if self.__balance >= amount:
            self.__balance -= amount
        else:
            print("Insufficient balance")

    def statement(self):
        print(f"Owner:{self.owner}")
        print("number", self.number)
        print("balance", self.balance)


class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.15):
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance*self.rate
        self.deposit(interest)

    def statement(self):
        return super().statement()


class CurrentAccount(Account):
    def __init__(self, owner, number, overdraft=0, balance=0, ):
        super().__init__(owner, number, balance)
        self.od = overdraft

    def withdraw(self, amount):
        if amount > self.balance + self.od:
            print("over limit")
        else:
            self.balance -= amount

    def statement(self):
        super().statement()
        print("Overdraft:", self.od)


bank = [
    SavingsAccount("Almaz", "CBE-1", 1500),
    CurrentAccount("Dawit", "CBE-2", 800),
]
for acc in bank:
    acc.deposit(100)  # shared behaviour
    acc.statement()
