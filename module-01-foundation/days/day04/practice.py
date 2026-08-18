class Product:

    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.__quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    def restock(self, n):
        self.__quantity += n

    def sell(self, n):

        if n > self.__quantity:
            print("Not enough stock.")
        else:
            self.__quantity -= n

    def display(self):
        print("----------------")
        print("Name:", self.name)
        print("Price:", self.price, "ETB")
        print("Quantity:", self.quantity)


p1 = Product("Laptop", 60000, 10)
p2 = Product("Phone", 25000, 20)
p3 = Product("Mouse", 700, 50)

p2.sell(5)
p1.restock(2)

p1.display()
p2.display()
p3.display()