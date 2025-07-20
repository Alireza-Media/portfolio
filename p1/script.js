// Greenify Landing Page JS
// 1. Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 2. Newsletter form validation
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.newsletter form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        e.preventDefault();
        emailInput.style.borderColor = 'red';
        emailInput.setCustomValidity('Please enter a valid email address.');
        emailInput.reportValidity();
      } else {
        emailInput.style.borderColor = '';
        emailInput.setCustomValidity('');
        alert('Thank you for subscribing!');
      }
    });
  }
});

// 3. Button ripple effect
document.querySelectorAll('.btn, .newsletter button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = e.offsetX + 'px';
    ripple.style.top = e.offsetY + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
