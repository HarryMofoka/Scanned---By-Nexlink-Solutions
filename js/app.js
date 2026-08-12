/* ======================================================
   App — Boot all modules
   ====================================================== */

import { initLenis }      from './lenis.js';
import { initAnimations } from './animations.js';
import { initScene }      from './scene.js';
import { initMenu }       from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll (needs ScrollTrigger reference)
  initLenis(ScrollTrigger);

  // 2. Mobile menu
  initMenu();

  // 3. GSAP scroll-triggered animations (only on pages with sections)
  if (document.querySelector('.hero') || document.querySelector('.section')) {
    initAnimations();
  }

  // 4. Three.js particle background
  initScene();

  // 5. FAQ accordion (support page)
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.faq-item').classList.toggle('is-open');
    });
  });
});
