
let userInfo = document.querySelector ("#user_info")
let userD = document.querySelector ("#user")
let links = document.querySelector ("#links")

if (localStorage.getItem("userfname")){
    links.remove()
    userInfo.style.display ="flex"
    userD.style.display="block"
    userD.innerHTML = "welcome " + localStorage.getItem("userfname")
   
}
let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "login.html";
    } , 1500)
})
// ////////////////////////////////////////////////////////////////////////////////////
let allProducts = document.querySelector(".products");
let favoriteDiv = document.querySelector(".favorite-products"); // 
let favoriteItems = localStorage.getItem("Favorites")
    ? JSON.parse(localStorage.getItem("Favorites"))
    : [];
let products = [
    {
        id: 1,
        title: "watch",
        price: "200$",
        imageUrl: "images/w32.jpg",
        category: "accessories",
        quantity: 1
    },
    {
        id: 2,
        title: "i phone",
        price: "500$",
        imageUrl: "images/mob.jpg",
        category: "apple iphones",
        quantity: 1
    },
    {
        id: 3,
        title: "woman clothes",
        price: "100$",
        imageUrl: "images/phone.jpg",
        category: "fasion",
        quantity: 1
    },
  
    {
        id: 4,
        title: "Perfume",
        price: "100$",
        imageUrl: "images/perf.jpg",
        category: "perfumes",
        quantity: 1
    },
    {
        id: 5,
        title: "black bags",
        price: "90$",
        imageUrl: "images/back2.jpg",
        category: "handbags",
        quantity: 1
    },
    {
        id: 6,
        title: "men shoes",
        price: "70$",
        imageUrl: "images/KOT.jpg",
        category: "sport",
        quantity: 1
    },
    {
        id: 7,
        title: "Children's dresses",
        price: "50$",
        imageUrl: "images/kid.jpg",
        category: "fasion",
        quantity: 1
    },
    {
        id: 8,
        title: "bag",
        price: "50$",
        imageUrl: "images/sto.jpeg",
        category: "men bags",
        quantity: 1
    },
   
    {
        id: 9,
        title: " buttle",
        price: "100$",
        imageUrl: "images/but.jpeg",
        category: "sport",
        quantity: 1
    },
];
let addedItem = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
function drawItems() {
    let result = products.map((item) => {
        let inCart = addedItem.find((product) => product.id === item.id);
        let isFavorite = favoriteItems.find((fav) => fav.id === item.id);

        return `
            <div class="product_item ">
                <img class="product_item_img" src="${item.imageUrl}" alt="${item.title}">
                <div class="product_item_desc">
                    <h3>Product: ${item.title}</h3>
                    <h3>Price: ${item.price}</h3>
                    <h3>Category: ${item.category}</h3>
                </div>
                <div class="product_item_action">
                    <button id="btn-${item.id}" 
                            class="cart_button" 
                            style="background-color: ${inCart ? "rgb(196, 30, 30)" : "green"}; color: white;" 
                            onClick="handleAddToCart(${item.id})">
                        ${inCart ? "Remove From Cart" : "Add To Cart"}
                    </button>
                    <button class="btn-fav" onClick="handleAddToFavorite(${item.id})">
                        <i class="fas fa-heart fav" style="color: ${
                            isFavorite ? "rgb(210, 19, 19)" : "rgb(170, 183, 195)"
                        }"></i>
                    </button>
                </div>
            </div>
        `;
    }).join(" ");
    document.querySelector(".products").innerHTML = result;
}
function isUserLoggedIn() {
    return localStorage.getItem("userfname") !== null;
}

function handleAddToCart(id) {
    if (!isUserLoggedIn()) {
        alert("You need to log in to add items to the cart.");
        window.location = "login.html";
        return; 
    }
    toggleCart(id); }


function handleAddToFavorite(id) {
    if (!isUserLoggedIn()) {
        alert("You need to log in to add items to favorites.");
        window.location = "login.html";
        return; 
    }
    toggleFavorite(id); 
}
function toggleCart(id) {
    let item = products.find((product) => product.id === id);
    let inCart = addedItem.find((product) => product.id === id);

    if (inCart) {
        addedItem = addedItem.filter((product) => product.id !== id);
    } else {
        addedItem.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    updateUI();
    drawItems();
}

function drawFavoriteItems() {
    let favoriteDiv = document.querySelector(".favorite-products"); // ا
    if (favoriteDiv) {

        if (favoriteItems && favoriteItems.length > 0) {
            let favoritesHtml = favoriteItems.map((item) => {
                return `
                    <div class="product_item">
                        <img class="product_item_img" src="${item.imageUrl}" alt="${item.title}">
                        <div class="product_item_desc">
                            <h3>Product: ${item.title}</h3>
                            <h3>Price: ${item.price}</h3>
                        </div>
                    </div>
                `;
            }).join("");

            favoriteDiv.innerHTML = favoritesHtml;  
        } else {
            favoriteDiv.innerHTML = "<p>No favorite items yet.</p>"; 
        }
    } else {
        console.error("Element '.favorite-products' not found in the DOM.");
    }
}
function toggleFavorite(id) {
    let selectedItem = products.find((item) => item.id === id);
    let isFavorite = favoriteItems.find((fav) => fav.id === id);

    if (isFavorite) {
        favoriteItems = favoriteItems.filter((fav) => fav.id !== id);
    } else {
        favoriteItems.push(selectedItem);
    }

    localStorage.setItem("Favorites", JSON.stringify(favoriteItems));
    drawItems();
    drawFavoriteItems();
}


function updateUI() {
    drawItems();
    drawCartProducts();
    updateBadge();
}
document.addEventListener("DOMContentLoaded", () => {
    updateUI();
});

function updateQuantity(productId, action,event) {
    event.stopPropagation();
    let product = addedItem.find(item => item.id === productId);

    if (product) {
        if (action === "increase") {
            product.quantity++;
        } else if (action === "decrease") {
            product.quantity--;
            if (product.quantity <= 0) {
                removeFromCart(productId);
                return;
            }
        }

        localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
        updateUI();
        drawCartProducts();
    }
}
function removeFromCart(productId) {
    addedItem = addedItem.filter(item => item.id !== productId);
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));

    
    updateUI();
}
function drawCartProducts() {
    let cartProductDiv = document.querySelector(".carts_products div");
    cartProductDiv.innerHTML = ''; 

    addedItem.forEach(item => {
        cartProductDiv.innerHTML += `
            <div class="product-item-action-quantity">
                <h3>${item.title}</h3>
                <div class="product-action">
                    <span class="quantity">${item.quantity}</span>
                    <button class="decrease" onclick="updateQuantity(${item.id}, 'decrease',event)">-</button>
                    <button class="increase" onclick="updateQuantity(${item.id}, 'increase',event)">+</button>
                </div>
            </div>
        `;
    });
}

function updateBadge() {
    let badge = document.querySelector(".badge");
    badge.style.display = addedItem.length > 0 ? "block" : "none";
    badge.innerHTML = addedItem.length; 
}

function updateUI() {
    drawItems();       
    drawCartProducts(); 
    updateBadge();     
}

let shoppingCartIcon = document.querySelector(".cart-select");
let cartsProducts = document.querySelector(".carts_products");

shoppingCartIcon.addEventListener("click", function () {
    cartsProducts.style.display = cartsProducts.style.display === "block" ? "none" : "block";
});


document.addEventListener("DOMContentLoaded", () => {
    updateUI();
});
// ////////////////////////////////////////////////////////////////////
// //search function
const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");

// 
searchInput.addEventListener("input", filterProducts);
searchType.addEventListener("change", filterProducts);

// 
function filterProducts() {
    const query = searchInput.value.toLowerCase(); // 
    const type = searchType.options[searchType.selectedIndex].text.toLowerCase(); // 

    let filteredProducts = products;

    if (query.trim() !== "") {
        if (type.includes("name")) {
            
            filteredProducts = products.filter((product) =>
                product.title.toLowerCase().includes(query)
            );
        } else if (type.includes("category")) {
            
            filteredProducts = products.filter((product) =>
                product.category.toLowerCase().includes(query)
            );
        }
    }

    // 
    drawFilteredItems(filteredProducts);
}

// 
function drawFilteredItems(filteredProducts) {
    let result = filteredProducts.map((item) => {
        let inCart = addedItem.find(product => product.id === item.id);
        let isFavorite = favoriteItems.find((fav) => fav.id === item.id);

        return `
            <div class="product_item" >
                <img class="product_item_img" src="${item.imageUrl}" alt="${item.title} " >
                <div class="product_item_desc">
                    <h3>Product: ${item.title}</h3>
                    <h3>Price: ${item.price}</h3>
                    <h3>Category: ${item.category}</h3>
                </div>
                <div class="product_item_action">
                    <button id="btn-${item.id}" 
                            class="cart_button" 
                              style="background-color: ${inCart ? "rgb(196, 30, 30)" : "green"}; color: white;" 
                            onClick="toggleCart(${item.id})">
                        ${inCart ? "Remove From Cart" : "Add To Cart"}
                    </button>
                    <button class="btn-fav" onClick="toggleFavorite(${item.id})">
                        <i class="fas fa-heart fav" style="color: ${
                            isFavorite ? "rgb(210, 19, 19)" : "rgb(170, 183, 195)"
                        }"></i>
                    </button>
                </div>
            </div>
        `;
    }).join(" ");
    document.querySelector(".products").innerHTML = result;
}
// ////////////////////////////////////////////////////////////////////////////
document.getElementById("menu-toggle").addEventListener("click", function () {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("show");
});
