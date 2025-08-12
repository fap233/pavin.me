function carregar() {
	var img = window.document.getElementById("imagem");
	var msg = window.document.getElementById("msg");
	var data = new Date();
	var hora = data.getHours();
	//	var hora = 15;

	msg.innerHTML = `It's  ${hora} o'clock.`;
	if (hora >= 0 && hora < 12) {
		// Bom dia!
		img.src = "images/fotomanha.png";
		document.body.style.background = "#CFC7B3";
	} else if (hora >= 12 && hora < 18) {
		// Boa tarde!
		img.src = "images/fototarde.png";
		document.body.style.background = "#8BB1C7";
	} else {
		// Boa noite!
		img.src = "images/fotonoite.png";
		document.body.style.background = "#2D2C39";
	}
}
