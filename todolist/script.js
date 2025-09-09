"use strict";

const getDatabase = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setDatabase = (database) =>
	localStorage.setItem("todoList", JSON.stringify(database));

const createItem = (task, status, index) => {
	const item = document.createElement("label");
	item.classList.add("todo__item");
	item.innerHTML = `
          <input type="checkbox" ${status} data-index=${index}/>
          <div>${task}</div>
          <input type="button" value="X" data-index=${index} />
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
	const database = getDatabase();
	database.forEach((item, index) => createItem(item.task, item.status, index));
};

const insertItem = (event) => {
	const key = event.key;
	const text = event.target.value;
	const clearInput = () => (event.target.value = "");
	if (key === "Enter") {
		const database = getDatabase();
		database.push({ task: text, status: "" });
		setDatabase(database);
		screenUpdate();
		clearInput();
	}
};

const removeItem = (index) => {
	const database = getDatabase();
	database.splice(index, 1);
	setDatabase(database);
	screenUpdate();
};

const updateItem = (index) => {
	const database = getDatabase();
	database[index].status = database[index].status === "" ? "checked" : "";
	setDatabase(database);
	screenUpdate();
};

const clickItem = (event) => {
	const element = event.target;
	const index = parseInt(element.dataset.index, 10);
	if (element.type === "button") {
		removeItem(index);
	} else if (element.type === "checkbox") {
		updateItem(index);
	}
};

document.getElementById("newItem").addEventListener("keypress", insertItem);
document.getElementById("todoList").addEventListener("click", clickItem);

screenUpdate();
