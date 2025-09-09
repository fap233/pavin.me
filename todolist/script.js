"use strict";

let database = [
	{ task: "Estudar JS", status: "" },
	{ task: "Netflix", status: "checked" },
	{ task: "teste", status: "checked" },
];

const createItem = (task, status) => {
	const item = document.createElement("label");
	item.classList.add("todo__item");
	item.innerHTML = `
          <input type="checkbox" ${status}/>
          <div>${task}</div>
          <input type="button" value="X" />
`;

	document.getElementById("todoList").appendChild(item);
};

const clearTasks = () => {
	const todoList = document.getElementById("todoList");
	while (todoList.firstChild) {
		todoList.removeChild(todoList.lastChild);
	}
};

const screenUpdate = () => {
	clearTasks();
	database.forEach((item) => createItem(item.task, item.status));
};

screenUpdate();
