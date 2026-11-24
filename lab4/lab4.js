
// Product List
const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile Phone", price: 20000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 }
];

// Load Wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("q4_wishlist")) || [];

// Save Wishlist
function saveWishlist() {
    localStorage.setItem("q4_wishlist", JSON.stringify(wishlist));
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
        button.textContent = "Add to Wishlist";

        button.onclick = function() {
            addToWishlist(product.id);
        };

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(button);

        productList.appendChild(div);
    });
}

// Add Product to Wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);

    const existingItem = wishlist.find(
        item => item.id === productId
    );

    if (existingItem) {
        alert("Product is already in your wishlist!");
        return;
    }

    wishlist.push(product);

    saveWishlist();
    displayWishlist();

    alert("Product added to wishlist!");
}

// Display Wishlist Items
function displayWishlist() {
    const wishlistDiv = document.getElementById("wishlist");

    wishlistDiv.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistDiv.textContent = "Your wishlist is empty.";
        return;
    }

    wishlist.forEach((item, index) => {
        const div = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "Price: Rs. " + item.price;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.onclick = function() {
            removeFromWishlist(index);
        };

        div.appendChild(name);
        div.appendChild(price);
        div.appendChild(removeBtn);

        wishlistDiv.appendChild(div);
    });
}

// Remove Product from Wishlist
function removeFromWishlist(index) {
    wishlist.splice(index, 1);

    saveWishlist();
    displayWishlist();

    alert("Product removed from wishlist!");
}

// Initialize Page
function initialize() {
    displayProducts();
    displayWishlist();
}

initialize();
