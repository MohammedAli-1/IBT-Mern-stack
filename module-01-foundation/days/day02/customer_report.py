# TeleBirr Customer Report

customers=[("Mohammed",1500),("amir",700),("tebe",200),("usul",1200),("abdulhaq",450)];

def tier(balance):
  if balance>=1000:
    return "Premium";
  elif balance>=500:
    return "Standard";
  else:
    return "Basic";
for name,balance in customers:
  print(f"{name}: {tier(balance)} - {balance} ETB")