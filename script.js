// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 79.99,
        category: "electronics",
        description: "Premium noise-canceling wireless headphones with 30-hour battery life",
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        description: "Fitness tracking smartwatch with heart rate monitor and GPS",
        emoji: "⌚"
    },
    {
        id: 3,
        name: "Laptop Backpack",
        price: 49.99,
        category: "electronics",
        description: "Water-resistant backpack with padded laptop compartment",
        emoji: "🎒"
    },
    {
        id: 4,
        name: "Cotton T-Shirt",
        price: 24.99,
        category: "clothing",
        description: "100% organic cotton t-shirt, available in multiple colors",
        emoji: "👕"
    },
    {
        id: 5,
        name: "Denim Jeans",
        price: 59.99,
        category: "clothing",
        description: "Classic fit denim jeans with stretch comfort",
        emoji: "👖"
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 89.99,
        category: "clothing",
        description: "Lightweight running shoes with cushioned sole",
        emoji: "👟"
    },
    {
        id: 7,
        name: "Winter Jacket",
        price: 129.99,
        category: "clothing",
        description: "Insulated winter jacket with removable hood",
        emoji: "🧥"
    },
    {
        id: 8,
        name: "JavaScript Guide",
        price: 34.99,
        category: "books",
        description: "Comprehensive guide to modern JavaScript programming",
        emoji: "📕"
    },
    {
        id: 9,
        name: "Cookbook Collection",
        price: 29.99,
        category: "books",
        description: "150 easy and delicious recipes for everyday cooking",
        emoji: "📗"
    },
    {
        id: 10,
        name: "Mystery Novel",
        price: 19.99,
        category: "books",
        description: "Bestselling thriller with unexpected twists",
        emoji: "📘"
    },
    {
        id: 11,
        name: "Coffee Maker",
        price: 79.99,
        category: "home",
        description: "Programmable coffee maker with thermal carafe",
        emoji: "☕"
    },
    {
        id: 12,
        name: "Plant Pot Set",
        price: 39.99,
        category: "home",
        description: "Set of 5 ceramic plant pots with drainage holes",
        emoji: "🪴"
    },
    {
        id: 13,
        name: "LED Desk Lamp",
        price: 44.99,
        category: "home",
        description: "Adjustable LED lamp with touch control and USB charging",
        emoji: "💡"
    },
    {
        id: 14,
        name: "Bluetooth Speaker",
        price: 59.99,
        category: "electronics",
        description: "Portable waterproof speaker with 360-degree sound",
        emoji: "🔊"
    },
    {
        id: 15,
        name: "Yoga Mat",
        price: 34.99,
        category: "home",
        description: "Non-slip yoga mat with carrying strap",
        emoji: "🧘"
    },
    {
        id: 16,
        name: "Sunglasses",
        price: 69.99,
        category: "clothing",
        description: "UV protection polarized sunglasses with stylish frames",
        emoji: "🕶️"
    },
    {
        id: 17,
        name: "Wireless Mouse",
        price: 29.99,
        category: "electronics",
        description: "Ergonomic wireless mouse with precision tracking",
        emoji: "🖱️"
    },
    {
        id: 18,
        name: "Travel Guide",
        price: 24.99,
        category: "books",
        description: "Complete travel guide with maps and tips",
        emoji: "🗺️"
    },
    {
        id: 19,
        name: "Wall Clock",
        price: 39.99,
        category: "home",
        description: "Modern minimalist wall clock with silent movement",
        emoji: "🕐"
    },
    {
        id: 20,
        name: "Canvas Sneakers",
        price: 44.99,
        category: "clothing",
        description: "Classic canvas sneakers in various colors",
        emoji: "👟"
    }
];

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const successModal = document.getElementById('successModal');
const cartCount = document.querySelector('.cart-count');
const viewCartBtn = document.getElementById('viewCartBtn');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const cartItems = document.getElementById('cartItems');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
});

// Render Products
function renderProducts() {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; color: white; grid-column: 1/-1;">No products found</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    showNotification('Added to cart!');
}

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Render Cart
function renderCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p style="font-size: 50px;">🛒</p>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    updateCartSummary();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
            updateCartCount();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
    const total = subtotal + tax + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 && subtotal > 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

// Clear Cart
clearCartBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
    }
});

// Search Products
searchInput.addEventListener('input', (e) => {
    filterProducts();
});

// Category Filter
categoryFilter.addEventListener('change', () => {
    filterProducts();
});

// Sort Filter
sortFilter.addEventListener('change', () => {
    filterProducts();
});

// Filter Products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;
    
    // Filter by search and category
    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        return matchesSearch && matchesCategory;
    });
    
    // Sort
    if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    renderProducts();
}

// Modal Controls
viewCartBtn.addEventListener('click', () => {
    renderCart();
    cartModal.style.display = 'block';
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
});

// Close Modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Checkout Form
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Generate order ID
    const orderId = 'ORD-' + Date.now().toString().slice(-8);
    document.getElementById('orderId').textContent = orderId;
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    
    // Show success modal
    checkoutModal.style.display = 'none';
    successModal.style.display = 'block';
    
    // Reset form
    checkoutForm.reset();
});

// Continue Shopping
continueShoppingBtn.addEventListener('click', () => {
    successModal.style.display = 'none';
});

// Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animations to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
