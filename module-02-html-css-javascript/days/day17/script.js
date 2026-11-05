"use strict";
import remoteData from "./remote.js"
const form = document.querySelector("#employeeForm");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const positionField = document.querySelector("#position");
const employeeList = document.querySelector("#employeeList");
const removeForm = document.querySelector("#removeForm");
const removeNameField = document.querySelector("#removebyname");
let employees = [];

const saveEmploy = function () {
  return localStorage.setItem("employee", JSON.stringify(employees));
};
const loadData = JSON.parse(localStorage.getItem("employee"));
if (loadData) {
  employees = loadData;
}
function resetForm() {
  nameField.value = "";
  emailField.value = "";
  positionField.value = "";
  removeNameField.value = "";
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = nameField.value;
  let email = emailField.value;
  let position = positionField.value;
  let employee = { name, email, position };
  employees.push(employee); //push to employee
  saveEmploy(); //save to localstorage
  renderEmployees();
  resetForm();
});

function renderEmployees() {
  employeeList.innerHTML = "";
  employees.map((employee) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>Name:</strong> ${employee.name} <strong>Email:</strong> ${employee.email} <strong>Position:</strong> ${employee.position}`;
    employeeList.appendChild(li);
  });
}
renderEmployees();

removeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let removeField = employees.filter(
    (employee) => employee.name.trim() !== removeNameField.value.trim(),
  );
  employees = removeField;
  saveEmploy();
  renderEmployees();
  resetForm();
});
const remoteList = document.querySelector("#remoteDataList");

function renderRemote() {
  remoteList.innerHTML = "Loading...";

  const data=remoteData();
  remoteList.innerHTML = "";
  data.then(users=>{
    users.map(user=>{
      const li=document.createElement('li');
      li.textContent=`${user.id}- ${user.name}-${user.email}`

      remoteList.appendChild(li)
    })
  })
}
renderRemote();