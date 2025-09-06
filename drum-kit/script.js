"use strict";

const sounds = {
	A: "boom.wav",
	S: "clap.wav",
	D: "hihat.wav",
	F: "kick.wav",
	G: "openhat.wav",
	H: "ride.wav",
	J: "snare.wav",
	K: "tink.wav",
	L: "tom.wav",
};

const createDiv = (textDiv) => {
	const div = document.createElement("div");
	div.classList.add("key");
	div.textContent = textDiv;
	div.id = textDiv;
	document.getElementById("container").appendChild(div);
};

const show = (sounds) => Object.keys(sounds).forEach(createDiv);

const playSound = (letter) => {
	const audio = new Audio(`./sounds/${sounds[letter]}`);
	audio.play();
};

show(sounds);

const addEffect = (letter) => {
	document.getElementById(letter).classList.add("active");
};

const removeEffect = (letter) => {
	const div = document.getElementById(letter);
	const removeActive = () => {
		div.classList.remove("active");
	};
	div.addEventListener("transitionend", removeActive);
};

const activateDiv = (event) => {
	const letter =
		event.type == "click" ? event.target.id : event.key.toUpperCase();
	const permitedLetter = sounds.hasOwnProperty(letter);
	if (permitedLetter) {
		addEffect(letter);
		playSound(letter);
		removeEffect(letter);
	}
};

document.getElementById("container").addEventListener("click", activateDiv);
window.addEventListener("keydown", activateDiv);
