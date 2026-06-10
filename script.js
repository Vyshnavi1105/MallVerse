let cart = [];
let wishlist = [];

const products = {
    clothing: [
        { name: "Cotton Kurta", category: "Kurtas", price: 999, image: "assets/images/clothing/kurtaset.jpg" },
        { name: "Floral Kurta", category: "Kurtas", price: 1299, image: "assets/images/clothing/kurta2.jpg" },
        { name: "Blue Jeans", category: "Jeans", price: 1499, image: "assets/images/clothing/jeans1.jpg" },
        { name: "Wide Leg Jeans", category: "Jeans", price: 1799, image: "assets/images/clothing/jeans2.jpg" },
        { name: "Crop Top", category: "Topwear", price: 699, image: "assets/images/clothing/top1.jpg" },
        { name: "Formal Shirt", category: "Topwear", price: 899, image: "assets/images/clothing/top2.jpg" },
        { name: "Palazzo Pants", category: "Bottomwear", price: 999, image: "assets/images/clothing/palazzopant.jpg" },
        { name: "Night Suit", category: "Nightwear", price: 1199, image: "assets/images/clothing/nightsuit.jpg" }
    ],

    juice: [
        { name: "Mango Juice", category: "Fresh Juices", price: 90, image: "assets/images/juice/mango.jpg" },
        { name: "Orange Juice", category: "Fresh Juices", price: 80, image: "assets/images/juice/orange.jpg" },
        { name: "Watermelon Juice", category: "Fresh Juices", price: 70, image: "assets/images/juice/watermelon.jpg" },
        { name: "Cold Coffee", category: "Shakes", price: 120, image: "assets/images/juice/coldcoffee.jpg" },
        { name: "Chocolate Shake", category: "Shakes", price: 140, image: "assets/images/juice/chocolate.jpg" },
        { name: "Strawberry Smoothie", category: "Smoothies", price: 160, image: "assets/images/juice/strawberry.jpg" }
    ],

    electronics: [
        { name: "Wireless Headphones", category: "Audio", price: 2499, image: "assets/images/electronics/headphones.jpg" },
        { name: "Bluetooth Speaker", category: "Audio", price: 1999, image: "assets/images/electronics/speaker.jpg" },
        { name: "Smart Watch", category: "Gadgets", price: 3999, image: "assets/images/electronics/watch.jpg" },
        { name: "Power Bank", category: "Gadgets", price: 1299, image: "assets/images/electronics/powerbank.jpg" }
    ],

    beauty: [
        { name: "Matte Lipstick", category: "Makeup", price: 499, image: "assets/images/beauty/lipstick.jpg" },
        { name: "Face Serum", category: "Skincare", price: 899, image: "assets/images/beauty/serum.jpg" },
        { name: "Perfume", category: "Fragrance", price: 1499, image: "assets/images/beauty/perfume.jpg" },
        { name: "Compact Powder", category: "Makeup", price: 699, image: "assets/images/beauty/compact.jpg" }
    ]
};

function showShop(shopName) {
    const shopTitle = document.getElementById("shop-title");
    const categoryButtons = document.getElementById("category-buttons");
    const shopProducts = products[shopName];

    shopTitle.innerText = shopName.toUpperCase() + " STORE";

    const categories = [...new Set(shopProducts.map(item => item.category))];

    categoryButtons.innerHTML = "";

    categories.forEach(category => {
        categoryButtons.innerHTML += `
            <button onclick="filterProducts('${shopName}', '${category}')">
                ${category}
            </button>
        `;
    });

    displayProducts(shopProducts);
    document.getElementById("products").scrollIntoView();
}

function filterProducts(shopName, category) {
    const filteredProducts = products[shopName].filter(item => item.category === category);
    displayProducts(filteredProducts);
}

function displayProducts(productList) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    productList.forEach(product => {
        container.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" 
                     alt="${product.name}" 
                     class="product-img"
                     onclick="openProductModal('${product.name}', ${product.price}, '${product.image}')">

                <h3 onclick="openProductModal('${product.name}', ${product.price}, '${product.image}')">
                    ${product.name}
                </h3>

                <p>${product.category}</p>
                <div class="badge-container">
    <span class="discount-badge">20% OFF</span>
    <span class="new-badge">NEW</span>
</div>

<p class="rating">⭐⭐⭐⭐⭐ (4.8)</p>

<p class="old-price">₹${Math.floor(product.price * 1.25)}</p>

<p class="price">₹${product.price}</p>

                <button onclick="addToWishlist('${product.name}')">
                    ❤️ Wishlist
                </button>

                <button onclick="addToCart('${product.name}', ${product.price})">
                    🛒 Add to Cart
                </button>

            </div>
        `;
    });
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
showToast("🛒 " + name + " added to cart");}

function updateCart() {
    document.getElementById("cart-count").innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-text">Your cart is empty.</p>`;
        totalPrice.innerText = "Total: ₹0";
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>Qty: ${item.quantity}</span>
                <span>₹${itemTotal}</span>
                <button onclick="increaseQty(${index})">+</button>
                <button onclick="decreaseQty(${index})">-</button>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    totalPrice.innerText = "Total: ₹" + total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orderNumber = Math.floor(Math.random() * 900000) + 100000;

    document.getElementById("order-id").innerText = "Order ID: MV" + orderNumber;
    document.getElementById("success-popup").style.display = "flex";

    cart = [];
    updateCart();
}

function closePopup() {
    document.getElementById("success-popup").style.display = "none";
}

function searchProducts() {
    const searchText = document.getElementById("search-box").value.toLowerCase();

    let allProducts = [];

    for (let shop in products) {
        allProducts = allProducts.concat(products[shop]);
    }

    const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
    );

    document.getElementById("shop-title").innerText = "Search Results";
    document.getElementById("category-buttons").innerHTML = "";

    if (filtered.length === 0) {
        document.getElementById("product-container").innerHTML =
            `<p class="empty-text">No products found.</p>`;
    } else {
        displayProducts(filtered);
    }

    document.getElementById("products").scrollIntoView();
}

function addToWishlist(name) {
    if (wishlist.includes(name)) {
showToast("❤️ Already in wishlist");    } else {
        wishlist.push(name);
showToast("❤️ " + name + " added to wishlist");    }
}

function increaseQty(index) {
    cart[index].quantity += 1;
    updateCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

function openProductModal(name, price, image) {
    document.getElementById("modal-name").innerText = name;
    document.getElementById("modal-price").innerText = "₹" + price;
    document.getElementById("modal-img").src = image;

    document.getElementById("modal-cart-btn").onclick = function () {
        addToCart(name, price);
        closeProductModal();
    };

    document.getElementById("product-modal").style.display = "flex";
}

function closeProductModal() {
    document.getElementById("product-modal").style.display = "none";
}

function showToast(message){

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.style.opacity = "1";

    setTimeout(function(){

        toast.style.opacity = "0";

    },2000);

}