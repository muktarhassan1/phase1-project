document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from public API (Fake Store API)
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check the structure of the response
            window.products = data; // Store products globally
            displayProducts(data); // Display all products initially
        })
        .catch(error => console.error("Error fetching data:", error));

    // Initialize an empty cart
    window.cart = [];

    // Event listeners
    const searchInput = document.getElementById('searchInput');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (searchInput) searchInput.addEventListener('input', handleSearch);
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
});

// Display products
function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; // Clear previous results

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        container.appendChild(productDiv);
    });

    // Attach event listeners for adding to cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const product = window.products.find(p => p.id == productId);

    // Check if the product is already in the cart
    if (window.cart.some(item => item.id === product.id)) {
        alert('This item is already in your cart!');
    } else {
        window.cart.push(product);
        updateCartDisplay();
    }
}

// Update the cart display
function updateCartDisplay() {
    const cartList = document.getElementById('cartList');
    if (!cartList) return; // If there's no cartList element, exit early
    cartList.innerHTML = ''; // Clear the cart list

    window.cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.title} - $${item.price} <button class="remove-item" data-id="${item.id}">Remove</button>`;
        cartList.appendChild(li);
    });

    // Attach event listeners for removing items
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove item from the cart
function removeFromCart(event) {
    const productId = event.target.getAttribute('data-id');
    window.cart = window.cart.filter(item => item.id != productId);
    updateCartDisplay();
}

// Clear the entire cart
function clearCart() {
    window.cart = [];
    updateCartDisplay();
}

// Checkout functionality
function checkout() {
    if (window.cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        alert('Proceeding to checkout...');
        // Add checkout process logic here
    }
}

// Search functionality
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = window.products.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}
