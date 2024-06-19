const products = [
    { id: 1, name: 'Hummus & Pita Bread', price: 10.00 },
    { id: 2, name: 'Chicken Sandwich', price: 15.00 },
    { id: 3, name: 'Grilled Eggplant', price: 20.00 },
    { id: 4, name: 'Seafood Salad', price: 25.00 },
    { id: 5, name: 'Turkey Sandwich', price: 30.00 },
    { id: 6, name: 'Chicken Lollipop', price: 35.00 },
    { id: 7, name: 'Barbeque Wings', price: 40.00 },
    { id: 8, name: 'Mac & Cheese', price: 45.00 },
    { id: 9, name: 'Chicken Pasta', price: 50.00 },
    { id: 10, name: 'Cheesy Garlic Twists', price: 55.00 },
];

const cart = [];
let user = null;

function displayProducts(filteredProducts = products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear previous products
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

function addToCart(productId) {
    if (!user) {
        alert('Please login to add products to the cart.');
        return;
    }
    const product = products.find(p => p.id === productId);
    cart.push(product);
    displayCart();
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);
        total += item.price;
    });
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function clearCart() {
    cart.length = 0;
    displayCart();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'user' && password === 'pass') {
        user = { username };
        document.getElementById('auth').innerHTML = `<p>Welcome, ${username}</p>`;
    } else {
        alert('Invalid username or password');
    }
}

document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
});

displayProducts();
