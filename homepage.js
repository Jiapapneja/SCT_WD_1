// ===== NAVBAR TOGGLE + SCROLL COLOR =====
const nav = document.querySelector('.site-header');
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');
const cartCountEl = document.getElementById('cart-count');

// Update year in footer
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Add "scrolled" class on scroll
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu toggle
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : ''; // lock/unlock scroll
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Smooth scroll for same-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    }
  });
});

// ===== MENU CARD SCROLL ANIMATION =====
const menuCards = document.querySelectorAll('.menu-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('show', entry.isIntersecting);
  });
}, { threshold: 0.5 });

menuCards.forEach(card => observer.observe(card));

// ===== CART SYSTEM =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in navbar
function updateCartCount() {
  if (cartCountEl) {
    cartCountEl.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  }
}

// Add to cart function
function addToCart(itemName, price) {
  let existing = cart.find(i => i.name === itemName);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name: itemName, price: price, qty: 1 });
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Redirect to cart page
function goToCart() {
  window.location.href = "cart.html";
}

// Initialize cart count on load
document.addEventListener("DOMContentLoaded", updateCartCount);
