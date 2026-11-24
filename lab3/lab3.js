
// Product List
const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile Phone", price: 20000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 }
];

// Load Cart from localStorage
let cart = JSON.parse(localStorage.getItem("q3_cart")) || [];

// Save Cart
function saveCart() {
    localStorage.setItem("q3_cart", JSON.stringify(cart));
}

// Display Products
function displayProducts() {
    const productList = document.getElementById("productList");

    productList.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "Price: Rs. " + product.price;

        const button = document.createElement("button");
        button.textContent = "Add to Cart";

        button.onclick = function() {
            addToCart(product.id);
        };

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(button);

        productList.appendChild(div);
    });
}

// Add Product to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    displayCart();

    alert("Product added to cart!");
}

// Display Cart Items
function displayCart() {
    const cartList = document.getElementById("cartList");

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.textContent = "Your cart is empty.";
    }

    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");

        const subtotal = item.price * item.quantity;
        total += subtotal;

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "Price: Rs. " + item.price;

        const quantity = document.createElement("p");
        quantity.textContent = "Quantity: " + item.quantity;

        const subtotalText = document.createElement("p");
        subtotalText.textContent = "Subtotal: Rs. " + subtotal;

        // Increase Quantity
        const increaseBtn = document.createElement("button");
        increaseBtn.textContent = "+";

        increaseBtn.onclick = function() {
            changeQuantity(index, 1);
        };

        // Decrease Quantity
        const decreaseBtn = document.createElement("button");
        decreaseBtn.textContent = "-";

        decreaseBtn.onclick = function() {
            changeQuantity(index, -1);
        };

        // Remove Product
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.onclick = function() {
            removeFromCart(index);
        };

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(quantity);
        div.appendChild(subtotalText);
        div.appendChild(increaseBtn);
        div.appendChild(decreaseBtn);
        div.appendChild(removeBtn);

        cartList.appendChild(div);
    });

    document.getElementById("cartTotal").textContent =
        "Total: Rs. " + total;
}

// Change Quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

// Remove Product from Cart
function removeFromCart(index) {
    cart.splice(index, 1);

    saveCart();
    displayCart();
}

// Initialize Page
function initialize() {
    displayProducts();
    displayCart();
}
initialize();
