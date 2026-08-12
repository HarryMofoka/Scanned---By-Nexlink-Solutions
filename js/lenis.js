/* ======================================================
   Lenis Smooth Scroll — initialised once, shared with GSAP
   ====================================================== */

export let lenis;

/**
 * Boot Lenis and hook it into GSAP's ScrollTrigger so
 * scroll-driven animations stay perfectly in sync.
 */
export function initLenis(ScrollTrigger) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // Keep ScrollTrigger in sync with Lenis' virtual scroll position
  lenis.on('scroll', ScrollTrigger.update);

  // Unified RAF loop — Lenis drives the tick, GSAP piggybacks
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}
