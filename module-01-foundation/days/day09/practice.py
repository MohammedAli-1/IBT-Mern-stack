 # Q1. Employee Directory
# A company has employees organized under managers (a tree). Write a recursive function that prints every
# employee's name with indentation showing who reports to whom.
# def display_employees(employee, indent=0):
from xml.etree.ElementTree import indent


class Employee:
  def __init__(self, name):
    self.name=name
    self.subordinates=[];
def display_employees(employee, indent=0): 
      print(" " * indent + employee.name);
      for child in employee.subordinates:
        display_employees(child, indent + 4);
ceo=Employee("CEO");
Manager1=Employee("Ali Manager");
ahmed=Employee("Ahmed");
oumer=Employee("Oumer");
manager2=Employee("Aisha Manager");
seid=Employee("Seid");
ceo.subordinates.append(Manager1);
Manager1.subordinates.append(ahmed);
Manager1.subordinates.append(oumer);
ceo.subordinates.append(manager2);
manager2.subordinates.append(seid);
display_employees(ceo)

# Q2. Student Search
# A school keeps a list of students sorted by ID. Write a function that uses binary search to find a student by
# ID, and another that uses linear search to find a student by name.
# def find_by_id(students, student_id): def find_by_name(students, name):
students=[
    {'id': 1, 'name': 'Ali'},
    {'id': 2, 'name': 'Aisha'},
    {'id': 3, 'name': 'Ahmed'},
    {'id': 4, 'name': 'Oumer'},
    {'id': 5, 'name': 'Seid'}
]
def find_by_id(students, student_id):
    left = 0
    right = len(students) - 1
    while left <= right:
        mid = (left + right) // 2
        if students[mid]['id'] == student_id:
            return students[mid]
        elif students[mid]['id'] < student_id:
            left = mid + 1
        else:
            right = mid - 1
    return None

def find_by_name(students, name):
    for student in students:
        if student['name'] == name:
            return student
    return None
result=find_by_id(students, 3)
# print(result["name"])  # Output: {'id': 3, 'name': 'Ahmed'}
result2=find_by_name(students, "Aisha")
# print(result2["id"])  # Output: {'id': 2, 'name': '

#Q3. Product Sorter
# An online store has a list of products. Write a function that sorts the products by price, from cheapest to most expensive.
# def sort_by_price(products):
products=[
    {'name': 'Product A', 'price': 10.99},
    {'name': 'Product B', 'price': 5.99},
    {'name': 'Product C', 'price': 15.99},
    {'name': 'Product D', 'price': 7.99}
]
def sort_by_price(products):
    return sorted(products, key=lambda x: x['price'],reverse=True)
# print(sort_by_price(products)) 
# Q4. Library Lookup
# A library has a list of books. Write a function that sorts the books by publication year, then a function that
# finds a book by its ID using binary search on the sorted list.
# def sort_by_year(books): def find_by_id(sorted_books, book_id):
books= [
    {'id': 1, 'title': 'Book A', 'year': 2010},
    {'id': 2, 'title': 'Book B', 'year': 2015},
    {'id': 3, 'title': 'Book C', 'year': 2005},
    {'id': 4, 'title': 'Book D', 'year': 2020}
];
def sort_by_year(books):
    return sorted(books, key=lambda x: x['year'])
def find_by_id(sorted_books, book_id):
    left = 0
    right = len(sorted_books) - 1
    while left <= right:
        mid = (left + right) // 2
        if sorted_books[mid]['id'] == book_id:
            return sorted_books[mid]
        elif sorted_books[mid]['id'] < book_id:
            left = mid + 1
        else:
            right = mid - 1
    return None
sorted_books = sort_by_year(books)

for book in sorted_books:
    print(f"{book['title']}: {book['year']}") 
print(find_by_id(sorted_books, 3))  # Output: {'id': 3, 'title': 'Book C', 'year': 2005}