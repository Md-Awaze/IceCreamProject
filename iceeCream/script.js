// Initialize cart
const cart = new Cart();

// Ice cream details
const iceCreamDetails = {
    trinity: {
        name: "Trinity",
        description: "A perfect harmony of chocolate, vanilla, and strawberry layers in a crispy waffle cone. Each layer is carefully crafted to provide a unique and delightful taste experience.",
        ingredients: [
            "Premium chocolate ice cream",
            "Madagascar vanilla bean ice cream",
            "Fresh strawberry ice cream",
            "Homemade waffle cone",
            "The flavour is Killer good like Trinity",
        ],
        price: "$5.99"
    },
    vanilla: {
        name: "Fun Time Vanilla",
        description: "Our signature vanilla soft-serve is made with premium Madagascar vanilla beans and crafted to perfection. The creamy texture and rich flavor make this classic treat an all-time favorite.",
        ingredients: [
            "Premium vanilla beans",
            "Fresh cream",
            "Organic milk",
            "Natural sweeteners from the GODS"
        ],
        price: "$4.99"
    },
    fairy: {
        name: "Fairy Pink",
        description: "A magical blend of strawberry ice cream topped with colorful sprinkles and our signature chocolate wafer stick. Perfect for those who love a touch of whimsy with their dessert.",
        ingredients: [
            "Fresh strawberry ice cream",
            "Rainbow sprinkles",
            "Chocolate wafer stick",
            "Fairy coloring"
        ],
        price: "$6.49"
    }
};

// Modal functionality
const modal = document.getElementById('ice-cream-modal');
const modalClose = modal.querySelector('.modal-close');

function openModal(iceCreamType) {
    const details = iceCreamDetails[iceCreamType];
    const modalImage = modal.querySelector('.modal-image img');
    const modalTitle = modal.querySelector('.modal-text h2');
    const modalDescription = modal.querySelector('.modal-text p');
    const ingredientsList = modal.querySelector('#ingredients-list');
    const price = modal.querySelector('.price');

    // Update modal content
    modalImage.src = `images/${iceCreamType === 'trinity' ? 'Trinity' : 
                             iceCreamType === 'vanilla' ? 'funTimeVanilla' : 
                             'FairyPink'}.jpg`;
    modalImage.alt = details.name;
    modalTitle.textContent = details.name;
    modalDescription.textContent = details.description;
    
    // Update ingredients
    ingredientsList.innerHTML = details.ingredients
        .map(ingredient => `<li>${ingredient}</li>`)
        .join('');
    
    price.textContent = details.price;

    // Add to cart button
    const addToCartBtn = modal.querySelector('#add-to-cart-btn') || document.createElement('button');
    if (!addToCartBtn.id) {
        addToCartBtn.id = 'add-to-cart-btn';
        addToCartBtn.className = 'bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full transition duration-300';
        addToCartBtn.textContent = 'Add to Cart';
        modal.querySelector('.modal-text').appendChild(addToCartBtn);
    }

    addToCartBtn.onclick = () => {
        cart.addItem(iceCreamType);
        closeModal();
        showToast('Added to cart!');
    };

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Add animation to cards when they come into view
const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1 }
);

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.5s ease-out';
    cardObserver.observe(card);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none';

    const mobileBreakpoint = 768;

    const toggleMenu = () => {
        const ul = nav.querySelector('ul');
        ul.classList.toggle('show');
    };

    const handleResize = () => {
        const ul = nav.querySelector('ul');
        if (window.innerWidth <= mobileBreakpoint) {
            menuButton.style.display = 'block';
            ul.classList.remove('show');
        } else {
            menuButton.style.display = 'none';
            ul.classList.remove('show');
        }
    };

    menuButton.addEventListener('click', toggleMenu);
    window.addEventListener('resize', handleResize);

    nav.insertBefore(menuButton, nav.firstChild);
    handleResize();
};

// Initialize mobile menu
function createMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const expanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
});