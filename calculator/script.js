const display = document.getElementById("display");

const numbers = document.querySelectorAll("[id*=key]");

const operators = document.querySelectorAll("[id*=Operator]");

const keyMap = {
	0: "key0",
	1: "key1",
	2: "key2",
	3: "key3",
	4: "key4",
	5: "key5",
	6: "key6",
	7: "key7",
	8: "key8",
	9: "key9",
	"/": "divOperator",
	"*": "multOperator",
	"-": "minusOperator",
	"+": "plusOperator",
	"=": "equals",
	Enter: "equals",
	Backspace: "backspace",
	c: "clearEntry",
	Escape: "clear",
	",": "decimal",
	".": "decimal",
};

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

		/*    const result = eval(`${previousNumber}${operator}${actualNumber}`);

        displayUpdate(result);


        /*    if (operator == "+") {

            displayUpdate(previousNumber + actualNumber);

        } else if (operator == "*") {

            displayUpdate(previousNumber * actualNumber);

        } else if (operator == "-") {

            displayUpdate(previousNumber - actualNumber);

        } else if (operator == "/") {

            displayUpdate(previousNumber / actualNumber);

        }

  */

		displayUpdate(parseFloat(result.toFixed(4)));
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

		display.textContent = `${previousNumber} ${operator}`;
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

const backspace = () => {
	display.textContent = display.textContent.slice(0, -1);
};

document.getElementById("backspace").addEventListener("click", backspace);

const invertSignal = () => {
	newNumber = true;

	displayUpdate(display.textContent * -1);
};

document.getElementById("invert").addEventListener("click", invertSignal);

const decimalPoint = () => {
	const parts = display.textContent.split(" ");

	const lastPart = parts[parts.length - 1];

	if (!lastPart.includes(".")) {
		if (lastPart === "" || lastPart.includes(operator)) {
			displayUpdate("0.");
		} else {
			displayUpdate(".");
		}
	}
};

document.getElementById("decimal").addEventListener("click", decimalPoint);

const activateButton = (event) => {
	const key = event.key;
	const targetButtonId = keyMap[key];

	if (targetButtonId) {
		document.getElementById(targetButtonId).click();
	}
};

window.addEventListener("keydown", activateButton);
