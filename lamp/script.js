const turnOn = document.getElementById("turnOn");
const turnOff = document.getElementById("turnOff");
const lamp = document.getElementById("lamp");
const turnOnOff = document.getElementById("turnOnOff");

function isLampBroken() {
	return lamp.src.indexOf("quebrada") > -1;
}

function lampOn() {
	if (!isLampBroken()) {
		lamp.src = "./img/ligada.jpg";
		turnOnOff.textContent = "OFF";
	}
}

function lampOff() {
	if (!isLampBroken()) {
		lamp.src = "./img/desligada.jpg";
		turnOnOff.textContent = "ON";
	}
}

function lampBroken() {
	lamp.src = "./img/quebrada.jpg";
}

function lampOnOff() {
	if (!isLampBroken()) {
		if (lamp.src.indexOf("desligada") > -1) {
			lampOn();
		} else {
			lampOff();
		}
	}
}

turnOn.addEventListener("click", lampOn);
turnOff.addEventListener("click", lampOff);
turnOnOff.addEventListener("click", lampOnOff);

lamp.addEventListener("mouseover", lampOn);
lamp.addEventListener("mouseleave", lampOff);
lamp.addEventListener("dblclick", lampBroken);
