/* ======================================================
   Mobile Menu — slide-from-right fullscreen overlay
   One toggleMenu() handles open/close + body scroll lock.
   ====================================================== */

import { lenis } from './lenis.js';

let isOpen = false;
let menuEl, toggleBtn, menuLinks;

/**
 * Toggle the mobile menu open/closed.
 * Uses GSAP for the slide + staggered link reveals.
 */
function toggleMenu() {
  isOpen = !isOpen;
  toggleBtn.setAttribute('aria-expanded', isOpen);
  menuEl.setAttribute('aria-hidden', !isOpen);

  if (isOpen) {
    menuEl.classList.add('is-open');
    // Lock scroll
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';

    // GSAP entrance
    gsap.fromTo(menuEl,
      { xPercent: 100 },
      { xPercent: 0, duration: 0.45, ease: 'power3.out' }
    );
    gsap.fromTo(menuLinks,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.06, delay: 0.15 }
    );
  } else {
    gsap.to(menuEl, {
      xPercent: 100, duration: 0.35, ease: 'power3.in',
      onComplete: () => {
        menuEl.classList.remove('is-open');
        // Unlock scroll
        if (lenis) lenis.start();
        document.body.style.overflow = '';
      }
    });
  }
}

/**
 * Init menu — call once after DOM ready.
 */
export function initMenu() {
  toggleBtn  = document.getElementById('menu-toggle');
  menuEl     = document.getElementById('mobile-menu');
  if (!toggleBtn || !menuEl) return;

  menuLinks = menuEl.querySelectorAll('.mobile-menu__link');

  toggleBtn.addEventListener('click', toggleMenu);

  // Close on link click (navigate)
  menuLinks.forEach(link => link.addEventListener('click', () => {
    if (isOpen) toggleMenu();
  }));

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) toggleMenu();
  });
}
