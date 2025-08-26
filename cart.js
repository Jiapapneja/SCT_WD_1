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
  alert("✅ Your order has been placed successfully!");
  localStorage.removeItem("cart"); // empty cart after order
  window.location.href = "homepage.html"; // back to home
}

window.onload = loadCart;
