stock = {}
try:

    with open("stock.txt") as f:
        for line in f:
            item, qty = line.strip().split(",")
            stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet — starting empty")


def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount


low = [item for item, qty in stock.items() if qty < 10]
print("Low stock:", low)
adjust("apple", 45)
with open("stock.txt", "w") as f:
    f.write("\n".join(f"{item},{qty}" for item, qty in stock.items()))

