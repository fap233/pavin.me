"use strict";

const body = document.querySelector("body");
const video = document.querySelector("video");

// body.onclick = () => (video.muted = !video.muted);

body.onclick = (event) => {
	if (event.target.closest("a")) {
		return;
	}

	video.muted = !video.muted;
};

const menu = document.querySelector(".menu-burger-container");

const active = () => menu.classList.toggle("active");

menu.addEventListener("click", active);
