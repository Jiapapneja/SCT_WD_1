function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsDiv = document.getElementById("cart-items");
  let total = 0;

  cartItemsDiv.innerHTML = "";

  cart.forEach(item => {
    let line = document.createElement("div");
    line.classList.add("cart-item");
    line.innerHTML = `${item.name} x ${item.qty} <span>₹${item.price * item.qty}</span>`;
    cartItemsDiv.appendChild(line);

    total += item.price * item.qty;
  });

  document.getElementById("cart-total").innerText = "Total: ₹" + total;
}

function confirmOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (cart.length === 0) {
    showToast("Your cart is empty! Please add items before placing an order.");
    return;
  }

  // Show loading screen
  showLoading();

  // After 2.5 seconds, hide loading and show order confirmation modal
  setTimeout(() => {
    hideLoading();
    showOrderModal();
  }, 2500);
}

function showLoading() {
  document.getElementById('loadingOverlay').classList.add('show');
}

function hideLoading() {
  document.getElementById('loadingOverlay').classList.remove('show');
}

function showOrderModal() {
  const modal = document.getElementById('orderModal');
  modal.classList.add('show');

  document.querySelector('.order-close').addEventListener('click', () => {
    modal.classList.remove('show');
  });

  document.getElementById('orderOkBtn').addEventListener('click', () => {
    modal.classList.remove('show');
    localStorage.removeItem("cart"); 
    window.location.href = "homepage.html";
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
}

//  Toast Notification
function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => { toast.classList.add("show"); }, 100);
  setTimeout(() => { 
    toast.classList.remove("show"); 
    setTimeout(() => toast.remove(), 300); 
  }, 3000);
}

window.onload = loadCart;
