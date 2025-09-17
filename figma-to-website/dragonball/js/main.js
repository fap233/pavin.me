"use strict";

const body = document.querySelector("body");
const video = document.querySelector("video");

body.onclick = () => (video.muted = !video.muted);
