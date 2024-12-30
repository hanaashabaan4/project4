
let products = JSON.parse(localStorage.getItem("ProductsInCart")) || [];

const allProducts = document.querySelector(".products");

function drawCartProducts(products) {
    let y = products.map((item) => {
        return `
            <div class="product_item2 ">
                <img class="product_item_img2" src="${item.imageUrl}" alt="" style="width: 100px; height: 100px;">
                <div class="product_content2">
                    <div class="product_item_desc2">
                        <h3>Product: ${item.title}</h3>
                        <h3>Price: ${item.price}</h3>
                        <h3>Category: ${item.category}</h3>
                    </div>
                    <div class="product_item_action2">
                        <span class=" quan2">${item.quantity}</span>
                        <button class="decrease2" onclick="updateQuantity(${item.id}, 'decrease')">-</button>
                        <button class="increase2" onclick="updateQuantity(${item.id}, 'increase')">+</button>
                        <button class="remove-from-cart" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");

    allProducts.innerHTML = y;
    calculateTotalPrice();
}
function calculateTotalPrice() {
    let totalPrice = 0;

    if (products && products.length > 0) {
        products.forEach(item => {
            let price = parseFloat(item.price.replace('$', '').trim());
            if (!isNaN(price)) {
                totalPrice += price * item.quantity;
            }
        });
    }
    let totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

function updateQuantity(productId, action) {
    let product = products.find((item) => item.id === productId);

    if (product) {
        if (action === "increase") {
            product.quantity++;
        } else if (action === "decrease") {
            product.quantity--;
            if (product.quantity === 0) {
                removeFromCart(productId);
                return;
            }
        }
        localStorage.setItem("ProductsInCart", JSON.stringify(products));
        drawCartProducts(products);
    }
}

// 
function removeFromCart(productId) {
    products = products.filter((item) => item.id !== productId);
    localStorage.setItem("ProductsInCart", JSON.stringify(products));
    drawCartProducts(products);
}
document.addEventListener("DOMContentLoaded", () => {
    drawCartProducts(products);
});
// /////////////////////////////////////////////////////////////////////
let favoriteItems = localStorage.getItem("Favorites")
    ? JSON.parse(localStorage.getItem("Favorites"))
    : [];

function toggleFavorite(productId) {
    const productIndex = favoriteItems.findIndex(item => item.id === productId);
    
    if (productIndex !== -1) {
        favoriteItems.splice(productIndex, 1);
    } else {
        const productToAdd = {
            id: productId,
            title: "Product Title", 
            category: "Product Category", 
            imageUrl: "product-image.jpg" 
        };
        favoriteItems.push(productToAdd);
    }

    localStorage.setItem("Favorites", JSON.stringify(favoriteItems));
    drawFavoriteItems();
}

function drawFavoriteItems() {
    const favoritesContainer = document.querySelector(".favorites-container");

    if (favoritesContainer) {
        if (favoriteItems && favoriteItems.length > 0) {
            let slides = "";
            for (let i = 0; i < favoriteItems.length; i += 3) {
                let slideItems = favoriteItems.slice(i, i + 3).map(item => {
                    return `
                        <div class="divfav col-lg-4  my-3">
                            <div class="product_item3">
                                <img src="${item.imageUrl}" alt="${item.title}" >
                                <div class="product_item_content3">
                                <div class="product_item_desc3">
                                
                                    <h3>Product: ${item.title}</h3>
                                    <h3>Category: ${item.category}</h3>
                                     </div>
                                    <div class="product_item_icon">
                                    <button class="btn-fav2" onClick="toggleFavorite(${item.id})" style="">
                                        <i class="fas fa-heart fav3"></i>
                                    </button>
                                     </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join("");

                slides += `
                    <div class="carousel-item ${i === 0 ? "active" : ""}">
                        <div class="row">${slideItems}</div>
                    </div>
                `;
            }

            favoritesContainer.innerHTML = slides;
        } else {
            favoritesContainer.innerHTML = "<p>No favorite items yet.</p>";
        }
    } else {
        console.error("Element '.favorites-container' not found in the DOM.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    drawFavoriteItems();
});