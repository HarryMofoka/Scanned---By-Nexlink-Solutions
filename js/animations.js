/* ======================================================
   GSAP Animations — one reusable reveal() drives everything
   ====================================================== */

/**
 * Generic scroll-triggered reveal.
 * Called with different selectors to animate cards, steps, stats, etc.
 *
 * @param {string}  selector  - CSS selector for elements to animate
 * @param {object}  [opts]    - override any GSAP `from` property
 */
export function reveal(selector, opts = {}) {
  const defaults = {
    y: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
  };

  const merged = { ...defaults, ...opts };
  const { stagger, ...fromVars } = merged;

  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...fromVars,
    stagger,
  });
}

/**
 * Hero-specific entrance — runs on load, no scroll trigger needed.
 */
function heroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

  tl.from('.eyebrow',     { y: 30, opacity: 0 })
    .from('.hero h1',      { y: 40, opacity: 0 }, '-=0.6')
    .from('.hero .sub',    { y: 30, opacity: 0 }, '-=0.5')
    .from('.hero-ctas',    { y: 20, opacity: 0 }, '-=0.4')
    .from('.proof-row',    { y: 20, opacity: 0 }, '-=0.3')
    .from('.phone',        { y: 60, opacity: 0, scale: 0.92 }, '-=0.7')
    .from('.float-badge',  { scale: 0, opacity: 0, stagger: 0.15 }, '-=0.4');
}

/**
 * Animate stat bars growing from zero height.
 */
function statBars() {
  gsap.from('.bar', {
    scrollTrigger: {
      trigger: '.bars',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    scaleY: 0,
    transformOrigin: 'bottom',
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.08,
  });
}

/**
 * Float badges gentle continuous float animation.
 */
function floatingBadges() {
  gsap.to('.float-badge.b1', {
    y: -8, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut',
  });
  gsap.to('.float-badge.b2', {
    y: 8, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut',
  });
}

/**
 * Master init — call once after DOM is ready and GSAP + ScrollTrigger loaded.
 */
export function initAnimations() {
  // Respect user preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero (no scroll trigger)
  heroEntrance();
  floatingBadges();

  // Scroll-triggered sections — all use the same reveal()
  reveal('.step');
  reveal('.feat-card', { y: 50, stagger: 0.15 });
  reveal('.section-head', { y: 40 });
  reveal('.stat-box', { y: 30, scale: 0.95, stagger: 0.1 });
  reveal('.cta-band', { y: 50, scale: 0.97, stagger: 0 });

  // Stat bars get their own animation (scaleY, not translateY)
  statBars();
}
