/* ======================================================
   App — Boot all modules & Dashboard interactions
   ====================================================== */

import { initLenis }      from './lenis.js';
import { initAnimations } from './animations.js';
import { initScene }      from './scene.js';
import { initMenu }       from './menu.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll (needs ScrollTrigger reference)
  if (typeof ScrollTrigger !== 'undefined') {
    initLenis(ScrollTrigger);
  }

  // 2. Mobile menu
  initMenu();

  // 3. GSAP scroll-triggered animations
  if (typeof gsap !== 'undefined' && (document.querySelector('.hero') || document.querySelector('.section'))) {
    initAnimations();
  }

  // 4. Three.js particle background (if canvas exists)
  initScene();

  // 5. FAQ accordion toggle
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.faq-item').classList.toggle('is-open');
    });
  });

  // 6. Interactive Preview Panel (Filter Pills & Search)
  const filterPills = document.querySelectorAll('.p-filters .filter-pill');
  const cardColumns = document.querySelectorAll('.columns .column');

  if (filterPills.length && cardColumns.length) {
    filterPills.forEach((pill, idx) => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        // Optional column highlight / filter effect
        const pillText = pill.textContent.trim().toLowerCase();
        cardColumns.forEach(col => {
          const colHead = col.querySelector('.col-head .left')?.textContent.toLowerCase() || '';
          if (pillText === 'info' && colHead.includes('contact')) {
            col.style.opacity = '1';
          } else if (pillText === 'links' && colHead.includes('links')) {
            col.style.opacity = '1';
          } else if (pillText === 'activity' && colHead.includes('activity')) {
            col.style.opacity = '1';
          } else {
            col.style.opacity = '1';
          }
        });
      });
    });
  }

  // Live Search filter in preview panel
  const searchInput = document.querySelector('.p-search input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cardItems = document.querySelectorAll('.card-item');
      cardItems.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});
