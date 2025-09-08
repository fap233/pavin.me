"use strict";

const digitFormat = (digit) => `0${digit}`.slice(-2);
const dayFormat = (digit) => {
	if (digit < 100) {
		return `0${digit}`.slice(-2);
	}
	return digit.toString();
};

const updateTime = (time) => {
	const seconds = document.getElementById("seconds");
	const minutes = document.getElementById("minutes");
	const hours = document.getElementById("hours");
	const days = document.getElementById("days");

	const secondsQuantity = Math.floor(time % 60);
	const minutesQuantity = Math.floor((time % (60 * 60)) / 60);
	const hoursQuantity = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
	const daysQuantity = Math.floor(time / (60 * 60 * 24));

	seconds.textContent = digitFormat(secondsQuantity);
	minutes.textContent = digitFormat(minutesQuantity);
	hours.textContent = digitFormat(hoursQuantity);
	days.textContent = dayFormat(daysQuantity);
};

const countdown = (time) => {
	const stopCounter = () => clearInterval(id);

	const counter = () => {
		if (time === 0) {
			stopCounter();
		}

		updateTime(time);

		time--;
	};

	const id = setInterval(counter, 1000);
};

const remainingTime = () => {
	// january 1 1970
	const eventDate = new Date("2025-09-09 20:00:00");
	const today = Date.now();

	return Math.floor((eventDate - today) / 1000);
};

countdown(remainingTime());
