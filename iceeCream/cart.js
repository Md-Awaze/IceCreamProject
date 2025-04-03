// Cart functionality
class Cart {
	constructor() {
		this.items = JSON.parse(localStorage.getItem("cart")) || [];
		this.orders = JSON.parse(localStorage.getItem("orders")) || [];
		this.updateCartCount();
	}

	addItem(id) {
		const iceCreamDetails = {
			trinity: {
				name: "Trinity",
				price: 5.99,
				image: "images/Trinity.jpg",
			},
			vanilla: {
				name: "Fun Time Vanilla",
				price: 4.99,
				image: "images/funTimeVanilla.jpg",
			},
			fairy: {
				name: "Fairy Pink",
				price: 6.49,
				image: "images/FairyPink.jpg",
			},
			custom: {
				name: "Custom Ice Cream",
				price: 10.99,
				image: "images/funTimeVanilla.jpg",
			},
		};
		console.log("kasmdkasmdkasmdksamdkmadaksdmmkasd");
		const details = iceCreamDetails[id];
		if (!details) return;

		const existingItem = this.items.find((item) => item.id === id);
		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			this.items.push({
				id: id,
				name: details.name,
				price: details.price,
				image: details.image,
				quantity: 1,
			});
		}

		this.saveCart();
		this.updateCartCount();
		this.showToast(`Added ${details.name} to cart!`);
	}

	removeItem(id) {
		this.items = this.items.filter((item) => item.id !== id);
		this.saveCart();
		this.updateCartCount();
	}

	updateQuantity(id, quantity) {
		const item = this.items.find((item) => item.id === id);
		if (item) {
			item.quantity = parseInt(quantity);
			if (item.quantity <= 0) {
				this.removeItem(id);
			} else {
				this.saveCart();
				this.updateCartCount();
			}
		}
	}

	getTotal() {
		return this.items.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	}

	clearCart() {
		this.items = [];
		this.saveCart();
		this.updateCartCount();
	}

	saveCart() {
		localStorage.setItem("cart", JSON.stringify(this.items));
	}

	updateCartCount() {
		const totalItems = this.items.reduce(
			(sum, item) => sum + item.quantity,
			0
		);
		const cartCount = document.getElementById("cart-count");
		if (cartCount) {
			cartCount.textContent = totalItems;
			cartCount.style.display = totalItems > 0 ? "block" : "none";
		}
	}

	showToast(message) {
		const toast = document.createElement("div");
		toast.className =
			"fixed bottom-4 right-4 bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300";
		toast.textContent = message;
		document.body.appendChild(toast);

		// Trigger reflow
		toast.offsetHeight;

		// Show toast
		toast.style.transform = "translateY(0)";

		// Hide and remove toast
		setTimeout(() => {
			toast.style.transform = "translateY(100%)";
			setTimeout(() => {
				document.body.removeChild(toast);
			}, 300);
		}, 3000);
	}

	formatTime(date) {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";
		const formattedHours = hours % 12 || 12;
		const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
		return `${formattedHours}:${formattedMinutes} ${ampm}`;
	}

	createOrder() {
		if (this.items.length === 0) return null;

		const orderNumber = Math.floor(10000 + Math.random() * 90000);
		const now = new Date();
		const estimatedMinutes = Math.floor(5 + Math.random() * 6); // Random between 5-10 minutes

		const order = {
			id: `SCOOP${orderNumber}`,
			items: [...this.items],
			total: this.getTotal(),
			status: "Processing",
			createdAt: now.toISOString(),
			estimatedMinutes: estimatedMinutes,
			estimatedTime: `${estimatedMinutes} minutes`,
			orderTime: this.formatTime(now),
		};

		// Save order to localStorage
		const orders = JSON.parse(localStorage.getItem("orders")) || [];
		orders.push(order);
		localStorage.setItem("orders", JSON.stringify(orders));

		// Clear the cart
		this.clearCart();

		return order;
	}

	getOrder(orderId) {
		const orders = JSON.parse(localStorage.getItem("orders")) || [];
		const order = orders.find((order) => order.id === orderId);
		if (order) {
			// Format the order time
			const orderDate = new Date(order.createdAt);
			order.orderTime = this.formatTime(orderDate);
		}
		return order;
	}

	updateOrderStatus(orderId) {
		const orders = JSON.parse(localStorage.getItem("orders")) || [];
		const order = orders.find((order) => order.id === orderId);

		if (!order) return null;

		const statuses = [
			"Processing",
			"In Progress",
			"Ready for Pickup",
			"Completed",
		];
		const createdAt = new Date(order.createdAt);
		const now = new Date();
		const minutesPassed = Math.floor((now - createdAt) / 1000 / 60);

		// Update status based on time passed
		if (minutesPassed < 5) {
			order.status = statuses[0];
		} else if (minutesPassed < 10) {
			order.status = statuses[1];
		} else if (minutesPassed < 15) {
			order.status = statuses[2];
		} else {
			order.status = statuses[3];
		}

		// Update estimated time
		const remainingMinutes = Math.max(
			0,
			order.estimatedMinutes - minutesPassed
		);
		order.estimatedTime =
			remainingMinutes > 0 ? `${remainingMinutes} minutes` : "Ready now";
		order.orderTime = this.formatTime(createdAt);

		localStorage.setItem("orders", JSON.stringify(orders));
		return order;
	}
}

// Initialize cart and make it globally available
const cart = new Cart();
window.cart = cart;

// Global functions
window.addToCart = function (id) {
	cart.addItem(id);
};

window.checkout = function () {
	const order = cart.createOrder();
	if (order) {
		const modal = document.getElementById("order-success-modal");
		const orderIdSpan = document.getElementById("order-id");
		if (modal && orderIdSpan) {
			orderIdSpan.textContent = order.id;
			modal.classList.remove("hidden");
		}
	}
};

// Initialize checkout functionality
const checkoutBtn = document.getElementById("checkout-btn");
const orderSuccessModal = document.getElementById("order-success-modal");
const continueShoppingBtn = document.getElementById("continue-shopping");

if (checkoutBtn) {
	checkoutBtn.addEventListener("click", () => {
		if (cart.items.length === 0) {
			showToast("Your cart is empty!");
			return;
		}

		const order = cart.createOrder();
		document.getElementById("order-id").textContent = order.id;
		orderSuccessModal.style.display = "flex";
	});
}

if (continueShoppingBtn) {
	continueShoppingBtn.addEventListener("click", () => {
		orderSuccessModal.style.display = "none";
		window.location.href = "index.html";
	});
}

// Initialize order tracking
const checkStatusBtn = document.getElementById("checkStatus");
const orderStatus = document.getElementById("orderStatus");
const errorMessage = document.getElementById("error-message");

if (checkStatusBtn) {
	checkStatusBtn.addEventListener("click", () => {
		const orderId = document.getElementById("orderId").value.trim();
		const order = cart.getOrder(orderId);

		if (!order) {
			errorMessage.textContent =
				"Order not found. Please check your Order ID.";
			errorMessage.classList.remove("hidden");
			orderStatus.classList.add("hidden");
			return;
		}

		// Update order status based on time
		const updatedOrder = cart.updateOrderStatus(orderId);

		// Display order details
		document.getElementById("displayOrderId").textContent = updatedOrder.id;
		document.getElementById("statusText").textContent = updatedOrder.status;
		document.getElementById("orderTime").textContent = new Date(
			updatedOrder.timestamp
		).toLocaleString();

		// Set estimated time based on status
		let estimatedTime = "";
		switch (updatedOrder.status) {
			case "Preparing":
				estimatedTime = "15-20 minutes";
				break;
			case "Ready to Pick Up":
				estimatedTime = "Ready now!";
				break;
			case "Delayed":
				estimatedTime = "30-45 minutes";
				break;
		}
		document.getElementById("estimatedTime").textContent = estimatedTime;

		errorMessage.classList.add("hidden");
		orderStatus.classList.remove("hidden");
	});
}

// Create cart instance
const cartInstance = new Cart();

// Export cart instance
window.cart = cartInstance;
window.showToast = showToast;

// Initialize cart count on page load
document.addEventListener("DOMContentLoaded", () => {
	cartInstance.updateCartCount();
});
