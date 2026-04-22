/* ============================================================
   CreativeCompass — main.js
============================================================ */

/* ============================
   SCROLL ANIMATIONS
   Fade-up reveal on scroll using IntersectionObserver
============================ */
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));


/* ============================
   FAQ ACCORDION TOGGLE
   Opens/closes FAQ items. Only one open at a time.
============================ */
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');

  // Close all open items
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

  // If it wasn't open, open it
  if (!isOpen) {
    item.classList.add('open');
  }
}


/* ============================
   MOBILE NAV
   Opens/closes the fullscreen mobile navigation overlay
============================ */
function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}

// Close mobile nav on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});


/* ============================
   NAV SCROLL SHADOW EFFECT
   Adds a subtle shadow to the navbar on scroll
============================ */
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 4px 24px rgba(26,26,46,0.1)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });


/* ============================
   SMOOTH SCROLL FOR ANCHOR LINKS
   Ensures smooth scrolling works even in older browsers
============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
