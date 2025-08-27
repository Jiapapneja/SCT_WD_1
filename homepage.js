//NAVBAR TOGGLE + SCROLL 
const nav = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
const cartCountEl = document.getElementById('cart-count');

// Toggle menu
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

//  CART SYSTEM 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// single addToCart function (merged)
function addToCart(name, price, img = '') {
  let qtyElement = document.getElementById(`quantity-${name}`);
  let qty = qtyElement ? parseInt(qtyElement.innerText) : 1;

  let existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty, img });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(`${qty} x ${name} added to cart!`);
}

document.addEventListener("DOMContentLoaded", updateCartCount);

// PRODUCT DETAIL MODAL 
const menuModal = document.getElementById('menuDetailModal');
const closeModalBtn = menuModal.querySelector('.menu-close');
const detailImg = document.getElementById('detail-img');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
const detailPrice = document.getElementById('detail-price');
const addToCartBtn = document.getElementById('addToCartBtn');

let currentItem = {};

document.querySelectorAll('.menu-card').forEach(card => {
  const imgEl = card.querySelector('img');
  const titleEl = card.querySelector('h3');
  const descEl = card.querySelector('p');
  const priceEl = card.querySelector('.price');

  [imgEl, titleEl].forEach(el => {
    el.addEventListener('click', () => {
      detailImg.src = imgEl.src;
      detailTitle.textContent = titleEl.textContent;
      detailDesc.textContent = descEl.textContent;
      detailPrice.textContent = priceEl.textContent;

      currentItem = {
        name: titleEl.textContent,
        price: parseInt(priceEl.textContent.replace('₹', '')),
        img: imgEl.src,
        qty: 1
      };

      menuModal.classList.add('show');
    });
  });
});

closeModalBtn.addEventListener('click', () => menuModal.classList.remove('show'));
menuModal.addEventListener('click', e => {
  if (e.target === menuModal) menuModal.classList.remove('show');
});

addToCartBtn.addEventListener('click', () => {
  addToCart(currentItem.name, currentItem.price, currentItem.img);
  menuModal.classList.remove('show');
});

// TOAST NOTIFICATION 
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

//  NAV CART REDIRECT 
function goToCart() {
  window.location.href = "cart.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const menuCards = document.querySelectorAll('.menu-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hide');
      } else {
        entry.target.classList.add('hide');
      }
    });
  }, { threshold: 0.1 });

  menuCards.forEach(card => {
    card.classList.add('hide');
    observer.observe(card);
  });
});

//  Quantity management 
function increaseQuantity(item) {
  let qtyElement = document.getElementById(`quantity-${item}`);
  let qty = parseInt(qtyElement.innerText);
  qtyElement.innerText = qty + 1;
}

function decreaseQuantity(item) {
  let qtyElement = document.getElementById(`quantity-${item}`);
  let qty = parseInt(qtyElement.innerText);
  if (qty > 1) {
    qtyElement.innerText = qty - 1;
  }
}
