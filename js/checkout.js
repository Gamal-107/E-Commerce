
// Selectors (Checkout Only)
const orderSummary = document.querySelector(".order-summary");
const itemsContainer = orderSummary.querySelector(".frame-container");
const subTotalEl = orderSummary.querySelector(".sub-salary");
const totalPriceEl = orderSummary.querySelector(".total-price");
const saveCartsIcon = document.querySelector(".save-products > a:nth-child(2)");


// Static values
const SHIPPING_COST = 20;

// Data
let cartItems = [];

// Init
initCheckout();


function initCheckout() {
  loadFromLocalStorage();
  renderItems();
  calculateTotals();
  
}

// Load Data
function loadFromLocalStorage() {
  const data = localStorage.getItem("data");
  cartItems = data ? JSON.parse(data) : [];
}

// Render Cart Items
function renderItems() {
  itemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    itemsContainer.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cartItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "container";

    div.innerHTML = `
      <div class="productt">
        <img src="./Ecommerce Website/${item.img}" alt="">
      </div>

      <div class="info">
        <h2>${item.name}</h2>
        <p class="salary">${item.price * item.quantity}$</p>

        <div class="quntity">
          <span class="increase">+</span>
          <span class="count">${item.quantity}</span>
          <span class="decrease">-</span>
        </div>
      </div>

      <div class="remove">
        <i class="fa-solid fa-trash-can"></i>
      </div>
    `;

    itemsContainer.appendChild(div);
  });
}

// Events (Increase / Decrease / Remove)
itemsContainer.addEventListener("click", e => {
  const container = e.target.closest(".container");
  if (!container) return;

  const name = container.querySelector("h2").textContent.trim();
  const index = cartItems.findIndex(p => p.name === name);
  if (index === -1) return;

  // Increase
  if (e.target.classList.contains("increase")) {
    cartItems[index].quantity++;
  }

  // Decrease
  if (e.target.classList.contains("decrease")) {
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity--;
    }
  }

  // Remove
  if (e.target.closest(".remove")) {
    cartItems.splice(index, 1);
  }

  saveAndUpdate();
});

// Save & Update
function saveAndUpdate() {
  localStorage.setItem("data", JSON.stringify(cartItems));
  renderItems();
  calculateTotals();
}

// Calculate Prices
function calculateTotals() {
  let subtotal = 0;

  cartItems.forEach(item => {
    subtotal += item.price * item.quantity;
  });

  subTotalEl.innerHTML = `$ ${subtotal}`;
  totalPriceEl.innerHTML = `$ ${subtotal + SHIPPING_COST}`;
}
