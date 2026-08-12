/* ======================================================
   App — Boot all modules
   ====================================================== */

import { initLenis }      from './lenis.js';
import { initAnimations } from './animations.js';
import { initScene }      from './scene.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll (needs ScrollTrigger reference)
  initLenis(ScrollTrigger);

  // 2. GSAP scroll-triggered animations
  initAnimations();

  // 3. Three.js particle background
  initScene();
});
