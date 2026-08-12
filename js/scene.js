/* ======================================================
   Three.js — Floating particles behind the hero
   Coral + periwinkle dots drifting gently on a dark bg.
   ====================================================== */

import * as THREE from 'three';

let camera, scene, renderer, particles;

/**
 * Create and start the particle scene.
 * Attaches to the <canvas id="scene-canvas"> element.
 */
export function initScene() {
  const canvas = document.getElementById('scene-canvas');
  if (!canvas) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ── Renderer
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ── Scene + Camera
  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 30;

  // ── Particles
  const count = 120;
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  const coral = new THREE.Color(0xff5a36);
  const peri  = new THREE.Color(0x8c97f5);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3]     = (Math.random() - 0.5) * 50;
    positions[i3 + 1] = (Math.random() - 0.5) * 40;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;

    const c = Math.random() > 0.5 ? coral : peri;
    colors[i3]     = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.35,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });

  particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // ── Resize handler
  window.addEventListener('resize', onResize);

  // ── Animate
  tick();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function tick() {
  requestAnimationFrame(tick);

  // Slow gentle rotation
  particles.rotation.y += 0.0004;
  particles.rotation.x += 0.0002;

  renderer.render(scene, camera);
}
