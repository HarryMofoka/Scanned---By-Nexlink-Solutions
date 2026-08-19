'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import DashboardPreview from '../components/DashboardPreview';
import FeaturesGrid from '../components/FeaturesGrid';
import InteractiveStats from '../components/InteractiveStats';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="stage">
      {/* Background Graphics */}
      <div className="glow-wrap">
        <div className="sphere-group left">
          <div className="sphere-halo"></div>
          <div className="sphere-core"></div>
        </div>
        <div className="sphere-group right">
          <div className="sphere-halo"></div>
          <div className="sphere-core"></div>
        </div>
        <svg className="streak-svg left" viewBox="0 0 1000 500" fill="none">
          <defs>
            <linearGradient id="streakGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.55" stopColor="#ffb37a" stopOpacity=".85" />
              <stop offset="1" stopColor="#ffffff" stopOpacity=".95" />
            </linearGradient>
            <filter id="streakBlur"><feGaussianBlur stdDeviation="1.4" /></filter>
          </defs>
          <g filter="url(#streakBlur)" stroke="url(#streakGrad)" fill="none" strokeLinecap="round">
            <path d="M60 480 C 260 380, 420 300, 640 150" strokeWidth="2.5" opacity=".9" />
            <path d="M120 480 C 300 400, 460 330, 660 200" strokeWidth="1.6" opacity=".6" />
            <path d="M20 420 C 220 340, 380 260, 560 110" strokeWidth="1.2" opacity=".5" />
          </g>
        </svg>
      </div>

      {/* Decorative Node Constellation */}
      <svg className="nodes" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <g stroke="rgba(255,255,255,.08)" strokeWidth="1">
          <line x1="180" y1="260" x2="330" y2="180" />
          <line x1="330" y1="180" x2="480" y2="230" />
          <line x1="1060" y1="200" x2="1220" y2="150" />
          <line x1="1220" y1="150" x2="1340" y2="230" />
        </g>
        <g fill="rgba(255,255,255,.14)">
          <circle cx="180" cy="260" r="4" />
          <circle cx="330" cy="180" r="4" />
          <circle cx="480" cy="230" r="4" />
          <circle cx="1060" cy="200" r="4" />
        </g>
      </svg>

      {/* Floating Chips */}
      <motion.div
        className="chip"
        style={{ top: '150px', left: '14%' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M6 8C8 6 16 6 18 8M4 12C7.5 9 16.5 9 20 12M8 16C9.5 14.7 14.5 14.7 16 16" /></svg>
      </motion.div>

      <motion.div
        className="chip"
        style={{ top: '255px', right: '12%' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><path d="M21 11.5A8.38 8.38 0 0112.5 20a8.5 8.5 0 01-3.8-.9L3 20l1.1-5.6A8.4 8.4 0 013 11.5 8.5 8.5 0 1121 11.5z" /></svg>
      </motion.div>

      <div className="wrap">
        {/* HERO */}
        <section className="hero" id="home">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="line1">Your Contact Card,</span>
            <span className="line2">One Tap Away</span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Build your profile once. Share your phone, LinkedIn, and socials with a
            single QR code or NFC tap — no app required for the person on the
            other end. Always up to date, never reprinted.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/signup" className="btn-cta">
              Get Early Access
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>

          {/* Interactive Preview Panel */}
          <DashboardPreview />
        </section>
      </div>

      {/* SECTION 1: HOW IT WORKS */}
      <div className="wrap below-sections" id="how">
        <div className="section-head">
          <span className="section-eyebrow">How it works</span>
          <h2>Three steps, no app required for the other person</h2>
          <p>Sign up, add your details, and share — anyone who scans your code sees your info instantly, right in their browser.</p>
        </div>

        <div className="steps">
          <motion.div className="step" whileHover={{ y: -4 }}>
            <div className="step-num">1</div>
            <h3>Build your card</h3>
            <p>Add your name, phone, LinkedIn, and any socials you want to share. Skip whatever you don't.</p>
          </motion.div>
          <motion.div className="step" whileHover={{ y: -4 }}>
            <div className="step-num">2</div>
            <h3>Get your QR or tag</h3>
            <p>We generate a QR code instantly. Write the same link to a physical NFC tag in one tap.</p>
          </motion.div>
          <motion.div className="step" whileHover={{ y: -4 }}>
            <div className="step-num">3</div>
            <h3>Share and update anytime</h3>
            <p>Print it, save it, or send the link directly. Change your number later and every code updates with it.</p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: FEATURES GRID */}
      <FeaturesGrid />

      {/* SECTION 3: STATS PREVIEW PANEL */}
      <InteractiveStats />

      {/* SECTION 4: TESTIMONIALS */}
      <Testimonials />

      {/* SECTION 5: CTA BAND */}
      <div className="wrap cta-section" id="cta">
        <div className="cta-band">
          <h2>Make your contact card in under two minutes</h2>
          <p>Free to start. Works seamlessly on web and mobile — no printing required, update anytime.</p>
          <div className="cta-buttons">
            <Link href="/signup" className="btn-cta-white">Create your card free</Link>
            <a href="/api/download" className="btn-cta-outline">Download APK</a>
          </div>
        </div>
      </div>
    </div>
  );
}
