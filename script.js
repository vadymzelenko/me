// ==================
// Custom Cursor
// ==================
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth trail
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  trail.style.left = trailX + 'px';
  trail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor hover state on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .skill-chip, .project-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
});

// ==================
// Mobile Hamburger
// ==================
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ==================
// Project Card Previews
// ==================
const isMobile = () => window.innerWidth <= 768;

function initPreviews() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const preview   = card.querySelector('.card-preview');
    const loader    = card.querySelector('.card-preview__loader');
    const iframe    = card.querySelector('.card-preview__iframe');
    let   loaded    = false;
    let   hoverTimer = null;

    function loadIframe() {
      if (loaded) return;
      loaded = true;
      const src = iframe.dataset.src;
      if (!src) return;

      // Show loader for ~2 seconds, then reveal iframe
      iframe.src = src;
      iframe.addEventListener('load', () => {
        // Minimum 2s loader display
        setTimeout(() => {
          loader.classList.add('hidden');
          iframe.classList.add('loaded');
        }, 400); // already waited ~2s from hover start
      });

      // Fallback: hide loader after 2.5s even if iframe doesn't fire load
      setTimeout(() => {
        loader.classList.add('hidden');
        iframe.classList.add('loaded');
      }, 2500);
    }

    if (!isMobile()) {
      // Desktop: hover triggers 2s loader then iframe
      card.addEventListener('mouseenter', () => {
        if (loaded) return;
        hoverTimer = setTimeout(() => {
          loadIframe();
        }, 0);
      });

      card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
      });
    } else {
      // Mobile: tap on the preview area loads it
      preview.addEventListener('click', (e) => {
        if (!loaded) {
          e.preventDefault();
          e.stopPropagation();
          loadIframe();

          // After load show a tap-to-open button
          setTimeout(() => {
            const btn = document.createElement('a');
            btn.href = card.dataset.url;
            btn.target = '_blank';
            btn.className = 'preview-open';
            btn.innerHTML = '<i class="fas fa-external-link-alt"></i> open live';
            const overlay = document.createElement('div');
            overlay.className = 'card-preview__overlay';
            overlay.style.opacity = '1';
            overlay.style.display = 'flex';
            overlay.appendChild(btn);
            preview.appendChild(overlay);
          }, 2600);
        }
      });
    }
  });
}

initPreviews();

// ==================
// Scroll Top Button
// ==================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// ==================
// Intersection Observer — animate sections in
// ==================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-chip').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
