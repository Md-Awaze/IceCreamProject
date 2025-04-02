// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.orders = JSON.parse(localStorage.getItem('orders')) || {};
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
    }

    updateQuantity(itemId, quantity) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            }
            this.saveCart();
            this.updateCartCount();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartCount() {
        const count = this.items.reduce((total, item) => total + item.quantity, 0);
        const cartBadge = document.getElementById('cart-count');
        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // Order management
    createOrder() {
        const orderId = 'SCOOP' + Math.floor(10000 + Math.random() * 90000);
        const statuses = ['Preparing', 'Ready to Pick Up', 'Delayed'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        const order = {
            id: orderId,
            items: [...this.items],
            total: this.getTotal(),
            status: status,
            timestamp: new Date().toISOString()
        };

        this.orders[orderId] = order;
        localStorage.setItem('orders', JSON.stringify(this.orders));
        
        this.clearCart();
        return order;
    }

    getOrder(orderId) {
        return this.orders[orderId];
    }

    updateOrderStatus(orderId) {
        const order = this.orders[orderId];
        if (order) {
            const orderTime = new Date(order.timestamp);
            const currentTime = new Date();
            const minutesPassed = (currentTime - orderTime) / (1000 * 60);

            if (minutesPassed > 30 && order.status === 'Preparing') {
                order.status = 'Delayed';
                this.orders[orderId] = order;
                localStorage.setItem('orders', JSON.stringify(this.orders));
            }
        }
        return order;
    }
}

// Initialize cart
const cart = new Cart();

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transform transition-transform duration-300 translate-y-16';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-16');
    }, 100);

    setTimeout(() => {
        toast.classList.add('translate-y-16');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Export cart instance
window.cart = cart;
window.showToast = showToast; 