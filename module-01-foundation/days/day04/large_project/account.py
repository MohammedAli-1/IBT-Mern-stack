class Account:
  def __init__(self,owner, account_number, balance):
    self.owner = owner #public attribute
    self.account_number = account_number
    self.__balance =balance #private attribute
  @property
  def balance(self):
      return self.__balance
  def deposit(self,amount):
      if amount<=0:
        raise ValueError("Deposit amount must be positive")
      self.__balance += amount
      print(f"Deposited {amount} ETB, new balance is {self.__balance} ETB")
  def withdraw(self,amount):
      if amount>self.__balance:
        print("insuffient balance");
      else:
        self.__balance-=amount;
        print(f"withdrawn {amount} ETB, new balance is {self.__balance} ETB")

account1=Account("Mohammed","1000264444129",1500);
account2=Account("Hassen","10004576831245",2000)
print(f"Account balance for {account1.owner}: {account1.balance}")
account1.deposit(500);
account1.withdraw(300);
