// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize cart
        const cart = new Cart();

        // Get DOM elements
        const flavorButtons = document.querySelectorAll('[id^="flavor-"]');
        const toppingButtons = document.querySelectorAll('[id^="topping-"]');
        const tabButtons = document.querySelectorAll('.tabs button');
        const customizationSections = document.querySelectorAll('.customization-section');

        console.log('Elements found:', {
            flavorButtons: flavorButtons.length,
            toppingButtons: toppingButtons.length,
            tabButtons: tabButtons.length,
            sections: customizationSections.length
        });

        // Selected options
        let selectedFlavor = 'vanilla'; // Default flavor
        let selectedToppings = [];

        // Handle flavor selection
        flavorButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove checked state from all flavor buttons
                flavorButtons.forEach(btn => {
                    btn.setAttribute('aria-checked', 'false');
                    btn.setAttribute('data-state', 'unchecked');
                    btn.querySelector('span')?.remove();
                });

                // Add checked state to selected button
                button.setAttribute('aria-checked', 'true');
                button.setAttribute('data-state', 'checked');
                selectedFlavor = button.value;

                // Add check mark span
                const span = document.createElement('span');
                span.setAttribute('data-state', 'checked');
                span.className = 'flex items-center justify-center';
                span.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle h-2.5 w-2.5 fill-current text-current"><circle cx="12" cy="12" r="10"></circle></svg>`;
                button.appendChild(span);

                console.log('Selected flavor:', selectedFlavor);
            });
        });

        // Handle topping selection
        toppingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const isChecked = button.getAttribute('aria-checked') === 'true';
                const toppingValue = button.id.replace('topping-', '');

                button.setAttribute('aria-checked', !isChecked);
                button.setAttribute('data-state', isChecked ? 'unchecked' : 'checked');

                if (!isChecked) {
                    selectedToppings.push(toppingValue);
                } else {
                    selectedToppings = selectedToppings.filter(t => t !== toppingValue);
                }

                console.log('Selected toppings:', selectedToppings);

                // Update price based on number of toppings
                updatePrice();
            });
        });

        // Handle tab switching
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Update tab buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Show corresponding section
                customizationSections.forEach((section, i) => {
                    section.style.display = i === index ? 'block' : 'none';
                });
            });
        });

        // Update price based on toppings
        function updatePrice() {
            const basePrice = 10.99;
            const toppingPrice = 0.50;
            const totalPrice = basePrice + (selectedToppings.length * toppingPrice);
            const addToCartButton = document.querySelector('.cta-button');
            if (addToCartButton) {
                addToCartButton.textContent = `Add to cart - $${totalPrice.toFixed(2)}`;
            }
        }

        // Handle add to cart
        window.addToCart = function(id) {
            try {
                if (!selectedFlavor) {
                    alert('Please select a flavor first!');
                    return;
                }

                console.log('Adding to cart:', {
                    id,
                    flavor: selectedFlavor,
                    toppings: selectedToppings
                });

                const customOptions = {
                    flavor: selectedFlavor,
                    toppings: selectedToppings,
                    name: `Custom ${selectedFlavor.charAt(0).toUpperCase() + selectedFlavor.slice(1)} Ice Cream`
                };
                
                // Verify cart instance exists
                if (typeof cart === 'undefined') {
                    console.error('Cart instance not found');
                    alert('There was an error with the cart. Please refresh the page and try again.');
                    return;
                }

                cart.addItem(id, customOptions);
                
                // Redirect to home page
                window.location.href = './index.html';
            } catch (error) {
                console.error('Error adding to cart:', error);
                alert('There was an error adding the item to cart. Please try again.');
            }
        };

        // Initialize the price display
        updatePrice();

        console.log('Custom ice cream builder initialized successfully');
    } catch (error) {
        console.error('Error initializing custom ice cream builder:', error);
    }
}); 