class Account:

    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.__balance = balance

    def deposit(self, amount):
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient balance")

    def statement(self):
        print("Owner :", self.owner)
        print("Number:", self.number)
        print("Balance:", self.__balance)
acc1 = Account("Mohammed", 1001, 5000)

acc1.deposit(1500)
acc1.withdraw(1000)
acc1.statement()        