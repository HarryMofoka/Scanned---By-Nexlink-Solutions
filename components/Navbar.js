'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <Link href="/" className="mobile-menu__link" onClick={closeMenu}>Home</Link>
        <Link href="/#how" className="mobile-menu__link" onClick={closeMenu}>How it works</Link>
        <Link href="/#features" className="mobile-menu__link" onClick={closeMenu}>Features</Link>
        <Link href="/#stats" className="mobile-menu__link" onClick={closeMenu}>Stats</Link>
        <Link href="/#testimonials" className="mobile-menu__link" onClick={closeMenu}>Testimonials</Link>
        <Link href="/about" className="mobile-menu__link" onClick={closeMenu}>About</Link>
        <a href="/api/download" className="mobile-menu__cta" onClick={closeMenu}>Download APK</a>
      </div>

      <nav>
        <Link href="/" className="logo">
          <div className="logo-mark">
            <svg viewBox="0 0 30 26" fill="none">
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffb37a" />
                  <stop offset="1" stopColor="#ff5a1f" />
                </linearGradient>
              </defs>
              <rect x="0" y="17" width="30" height="6" rx="3" fill="url(#lg)" />
              <rect x="4" y="9" width="22" height="6" rx="3" fill="url(#lg)" opacity=".8" />
              <rect x="8" y="1" width="14" height="6" rx="3" fill="url(#lg)" opacity=".55" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="brand-title">Scanned</span>
            <span className="brand-sub">by Nexlink Solutions</span>
          </div>
        </Link>

        <div className="nav-pill">
          <Link href="/">Home</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#stats">Stats</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <a href="/api/download">Download</a>
        </div>

        <div className="nav-right">
          <a href="/api/download" className="btn-solid-pill">Download APK</a>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </>
  );
}
