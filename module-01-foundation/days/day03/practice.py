Cities = ["Addis Abeba", "Dessie", "addis abeba",
          "Dessie", "Addis Abeba", "Adama"]
unique_cities = set(Cities.lower() for Cities in Cities)
print(unique_cities)
print(f"Number of unique cities: {len(unique_cities)}")
price_category = {"phone": 1500, "tablet": 70000,
                  "laptop": 20000, "desktop": 12000, "smartwatch": 4500}
for product, price in price_category.items():
    print(f"{product}: {price} ETB")
prices = [100, 250, 400, 80]
taxi = [price*0.15 for price in prices]
Cheap = [price for price in prices if price < 200]
print(taxi)
print(Cheap)
with open("name.txt", "w")as f:
    f.write("Mohammed\n")
    f.write("Ali\n")
    f.write("Abdullahi\n")

with open("name.txt", "r")as f:
    for line in f:
        print(line.strip())
try:
    number = int(input("Enter a number: "))
    division = 10/number
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")
except ValueError:
    print("Error: Invalid input. Please enter a valid number.")
else:
    print(f"Result: {division}")
finally:
    print("Execution completed.")
