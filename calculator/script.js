"use strict";

const display = document.getElementById("display");
const numbers = document.querySelectorAll("[id*=key]");
const operators = document.querySelectorAll("[id*=Operator]");

let newNumber = true;
let operator;
let previousNumber;

const pendentOperation = () => operator !== undefined;

const calculate = () => {
	if (pendentOperation()) {
		const actualNumber = parseFloat(display.textContent);
		newNumber = true;

		let result;
		switch (operator) {
			case "+":
				result = previousNumber + actualNumber;
				break;
			case "-":
				result = previousNumber - actualNumber;
				break;
			case "*":
				result = previousNumber * actualNumber;
				break;
			case "/":
				result = previousNumber / actualNumber;
				break;
		}

		/*	const result = eval(`${previousNumber}${operator}${actualNumber}`);
		displayUpdate(result);

		/*	if (operator == "+") {
			displayUpdate(previousNumber + actualNumber);
		} else if (operator == "*") {
			displayUpdate(previousNumber * actualNumber);
		} else if (operator == "-") {
			displayUpdate(previousNumber - actualNumber);
		} else if (operator == "/") {
			displayUpdate(previousNumber / actualNumber);
		}
  */
		displayUpdate(result);
	}
};

const displayUpdate = (text) => {
	if (newNumber) {
		display.textContent = text;
		newNumber = false;
	} else {
		display.textContent += text;
	}
};

const insertNumber = (event) => displayUpdate(event.target.textContent);

numbers.forEach((number) => number.addEventListener("click", insertNumber));

const selectOperator = (event) => {
	if (!newNumber) {
		calculate();
		newNumber = true;
		operator = event.target.textContent;
		previousNumber = parseFloat(display.textContent);
	}
};

operators.forEach((operator) =>
	operator.addEventListener("click", selectOperator),
);

const activateEquals = () => {
	calculate();
	operator = undefined;
	newNumber = true;
};
document.getElementById("equals").addEventListener("click", activateEquals);

// clear display (CE)

const clearEntry = () => {
	display.textContent = "";
};

document.getElementById("clearEntry").addEventListener("click", clearEntry);

// clear all (C)

const clear = () => {
	clearEntry();
	newNumber = true;
	operator = undefined;
	previousNumber = undefined;
};

document.getElementById("clear").addEventListener("click", clear);
