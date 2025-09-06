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

show(sounds);

const activateDiv = (event) => {
	console.log(event);
};

document.getElementById("container").addEventListener("click", activateDiv);
