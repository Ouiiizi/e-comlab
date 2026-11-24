
// Load saved data from localStorage
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

// Save categories and products
function saveData() {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("products", JSON.stringify(products));
}

// Add Category
function addCategory() {
    const input = document.getElementById("categoryInput");
    const categoryName = input.value.trim();

    if (categoryName === "") {
        alert("Please enter a category name");
        return;
    }

    // Prevent duplicate categories
    if (categories.some(cat => cat.toLowerCase() === categoryName.toLowerCase())) {
        alert("Category already exists");
        return;
    }

    categories.push(categoryName);

    saveData();
    input.value = "";

    displayCategories();
    updateCategoryDropdown();
}

// Display Categories

function displayCategories() {
    const categoryList = document.getElementById("categoryList");

    categoryList.innerHTML = "";

    categories.forEach((category, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = category;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = function() {
            deleteCategory(index);
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);

        categoryList.appendChild(li);
    });
}

// Delete Category
function deleteCategory(index) {
    const category = categories[index];

    // Check if category has products
    const hasProducts = products.some(
        product => product.category === category
    );

    if (hasProducts) {
        alert("Cannot delete category. Products are assigned to it.");
        return;
    }

    if (confirm("Are you sure you want to delete this category?")) {
        categories.splice(index, 1);

        saveData();
        displayCategories();
        updateCategoryDropdown();
    }
}


// Update Product Category Dropdown
function updateCategoryDropdown() {
    const dropdown = document.getElementById("productCategory");

    dropdown.innerHTML = '<option value="">Select Category</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;

        dropdown.appendChild(option);
    });
}

// Add Product
function addProduct() {
    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value;
    const category = document.getElementById("productCategory").value;

    if (!name || !price || !category || Number(price) <= 0) {
        alert("Please enter valid product details");
        return;
    }

    const product = {
        id: Date.now(),
        name: name,
        price: Number(price),
        category: category
    };

    products.push(product);

    saveData();

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "";

    displayProducts();
}

// Display Products with Categories

function displayProducts() {
    const productList = document.getElementById("productList");

    productList.innerHTML = "";

    if (products.length === 0) {
        productList.textContent = "No products added yet.";
        return;
    }

    products.forEach((product, index) => {
        const div = document.createElement("div");

        const heading = document.createElement("h3");
        heading.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "Price: Rs." + product.price;

        const category = document.createElement("p");
        category.textContent = "Category: " + product.category;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = function() {
            deleteProduct(index);
        };

        div.appendChild(heading);
        div.appendChild(price);
        div.appendChild(category);
        div.appendChild(deleteBtn);

        productList.appendChild(div);
    });
}

// Delete Product
function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
        products.splice(index, 1);

        saveData();
        displayProducts();
    }
}


// Load everything when page opens or reloads
function initialize() {
    displayCategories();
    updateCategoryDropdown();
    displayProducts();
}

initialize();
