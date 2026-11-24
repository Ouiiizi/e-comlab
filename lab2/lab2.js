
// Available products
const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile Phone", price: 20000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 }
];

// Load saved cart and orders
let cart = JSON.parse(localStorage.getItem("q2_cart")) || [];
let orders = JSON.parse(localStorage.getItem("q2_orders")) || [];

// Save data in localStorage
function saveData() {
    localStorage.setItem("q2_cart", JSON.stringify(cart));
    localStorage.setItem("q2_orders", JSON.stringify(orders));
}

// Display Available Products
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

    saveData();
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

        const itemTotal = document.createElement("p");
        itemTotal.textContent = "Subtotal: Rs. " + subtotal;

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

        // Remove Item
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function() {
            removeFromCart(index);
        };

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(quantity);
        div.appendChild(itemTotal);
        div.appendChild(increaseBtn);
        div.appendChild(decreaseBtn);
        div.appendChild(removeBtn);

        cartList.appendChild(div);
    });

    document.getElementById("cartTotal").textContent =
        "Total: Rs. " + total;
}

// Change Product Quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;

    // Remove item if quantity becomes zero
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveData();
    displayCart();
}

// Remove Product from Cart
function removeFromCart(index) {
    cart.splice(index, 1);

    saveData();
    displayCart();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!confirm("Are you sure you want to place this order?")) {
        return;
    }

    const order = {
        orderId: Date.now(),
        items: cart.map(item => ({ ...item })),
        total: cart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        ),
        date: new Date().toLocaleString()
    };

    // Save order
    orders.push(order);

    // Clear cart
    cart = [];

    saveData();

    displayCart();
    displayOrders();

    alert("Order placed successfully!");
}

// Display Ordered Items
function displayOrders() {
    const orderList = document.getElementById("orderList");

    orderList.innerHTML = "";

    if (orders.length === 0) {
        orderList.textContent = "No orders placed yet.";
        return;
    }

    orders.forEach((order, index) => {
        const div = document.createElement("div");

        const heading = document.createElement("h3");
        heading.textContent = "Order " + (index + 1);

        const date = document.createElement("p");
        date.textContent = "Date: " + order.date;

        const itemsHeading = document.createElement("p");
        itemsHeading.textContent = "Ordered Items:";

        div.appendChild(heading);
        div.appendChild(date);
        div.appendChild(itemsHeading);

        order.items.forEach(item => {
            const itemDetails = document.createElement("p");

            itemDetails.textContent =
                item.name +
                " - Quantity: " + item.quantity +
                " - Rs. " + (item.price * item.quantity);

            div.appendChild(itemDetails);
        });

        const total = document.createElement("h3");
        total.textContent = "Order Total: Rs. " + order.total;

        div.appendChild(total);

        orderList.appendChild(div);
    });
}

// Initialize Page
function initialize() {
    displayProducts();
    displayCart();
    displayOrders();
}

initialize();
