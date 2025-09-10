"use strict";

const openModal = () =>
	document.getElementById("modal").classList.add("active");

const closeModal = () => {
	clearFields();
	document.getElementById("modal").classList.remove("active");
};

const cancelModal = () => {
	clearFields();
	document.getElementById("modal").classList.remove("active");
};

const getLocalStorage = () =>
	JSON.parse(localStorage.getItem("db_customer")) ?? [];
const setLocalStorage = (dbCustomer) =>
	localStorage.setItem("db_customer", JSON.stringify(dbCustomer));

// CRUD - Create, Read, Update, Delete

// CRUD - DELETE
const deleteCustomer = (index) => {
	const dbCustomer = readCustomer();

	dbCustomer.splice(index, 1);
	setLocalStorage(dbCustomer);
};

// CRUD - UPDATE

const updateCustomer = (index, customer) => {
	const dbCustomer = readCustomer();
	dbCustomer[index] = customer;
	setLocalStorage(dbCustomer);
};

// CRUD - READ

const readCustomer = () => getLocalStorage();

// CRUD - CREATE
const createCustomer = (customer) => {
	const dbCustomer = getLocalStorage();

	dbCustomer.push(customer);
	setLocalStorage(dbCustomer);
};

const isValidFields = () => {
	return document.getElementById("form").reportValidity();
};

// Interaction with layout

const clearFields = () => {
	const fields = document.querySelectorAll(".modal-field");
	fields.forEach((field) => (field.value = ""));
};

const saveCustomer = () => {
	if (isValidFields()) {
		const customer = {
			name: document.getElementById("name").value,
			email: document.getElementById("email").value,
			phone: document.getElementById("phone").value,
			city: document.getElementById("city").value,
		};

		const index = document.getElementById("name").dataset.index;
		if (index == "new") {
			createCustomer(customer);
			updateTable();
			closeModal();
		} else {
			updateCustomer(index, customer);
			updateTable();
			closeModal();
		}
	}
};

const createRow = (customer, index) => {
	const newRow = document.createElement("tr");
	newRow.innerHTML = `
    <td>${customer.name}</td>
    <td>${customer.email}</td>
    <td>${customer.phone}</td>
    <td>${customer.city}</td>
    <td>
      <button type="button" class="button green" id= 'edit-${index}'>edit</button>
      <button type="button" class="button red" id='delete-${index}'>delete</button>
    </td>
`;

	document.querySelector("#tableClient>tbody").appendChild(newRow);
};

const clearTable = () => {
	const rows = document.querySelectorAll("#tableClient>tbody tr");
	rows.forEach((row) => row.parentNode.removeChild(row));
};

const updateTable = () => {
	const dbCustomer = readCustomer();
	clearTable();
	dbCustomer.forEach(createRow);
};

const fillFields = (customer) => {
	document.getElementById("name").value = customer.name;
	document.getElementById("email").value = customer.email;
	document.getElementById("phone").value = customer.phone;
	document.getElementById("city").value = customer.city;
	document.getElementById("name").dataset.index = customer.index;
};

const editCustomer = (index) => {
	const customer = readCustomer()[index];
	customer.index = index;
	fillFields(customer);
	openModal();
};

const editDelete = (event) => {
	if (event.target.type === "button") {
		const [action, index] = event.target.id.split("-");

		if (action === "edit") {
			editCustomer(index);
		} else {
			const customer = readCustomer()[index];
			const response = confirm(
				`Are you sure you want to delete the customer ${customer.name}?`,
			);
			if (response) {
				deleteCustomer(index);
				updateTable();
			}
		}
	}
};

updateTable();

// Events
document
	.getElementById("customerRegister")
	.addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("save").addEventListener("click", saveCustomer);

document.getElementById("cancel").addEventListener("click", cancelModal);

document
	.querySelector("#tableClient>tbody")
	.addEventListener("click", editDelete);
