'use strict';
const bill= Number(prompt("Enter your bill amount:"));
const partySize= Number(prompt("Enter your party size:"));
const tiprate=(bill>300)? 0.1:0.05;
const tip= bill * tiprate;
const total= bill + tip;
const split= total / partySize;
console.log(`Your total bill is ${total} and each person should pay ${split}`);
let service;
let serviceFee;
switch (service) {
  case "CBE":
    serviceFee = 0.1;
    break;
    case "Telebirr":
    serviceFee = 0.05;
    break;  
}