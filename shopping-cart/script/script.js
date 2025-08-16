document.addEventListener("DOMContentLoaded", function () {
	const cart = document.getElementById("cart");
	const totalChargeElement = document.getElementById("totalCharge");
	const productItems = document.querySelectorAll(".product-item");

	function updateCart() {
		let totalCharge = 0;

		productItems.forEach((product) => {
			const price = parseFloat(product.dataset.price);

			const quantityInput = product.querySelector(".quantity-input");

			const quantity = parseInt(quantityInput.value);

			const subtotalElement = product.querySelector(".subtotal-display");

			const subtotal = price * quantity;
			totalCharge += subtotal;

			subtotalElement.textContent = subtotal.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			});
		});

		totalChargeElement.textContent = totalCharge.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	}

	cart.addEventListener("click", (event) => {
		const target = event.target;
		const product = target.closest(".product-item");

		if (!product) return;

		const quantityInput = product.querySelector(".quantity-input");
		let quantity = parseInt(quantityInput.value);

		if (target.classList.contains("btn-plus")) {
			quantity++;
			quantityInput.value = quantity;
			updateCart();
		}

		if (target.classList.contains("btn-minus")) {
			if (quantity > 0) {
				quantity--;
				quantityInput.value = quantity;
				updateCart();
			}
		}

		if (target.classList.contains("btn-remove")) {
			quantityInput.value = 0;
			updateCart();
		}
	});

	updateCart();
});
