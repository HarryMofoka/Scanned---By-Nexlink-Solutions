'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Instant Dual-Sharing',
    desc: 'Share via camera QR scan or tap any blank NFC card or sticker with your smartphone. Fast and effortless.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M6 8C8 6 16 6 18 8M4 12C7.5 9 16.5 9 20 12M8 16C9.5 14.7 14.5 14.7 16 16" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Profile Sync',
    desc: 'Updated your number or switched jobs? Edit your card in seconds — all existing QR codes and NFC tags stay current.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Zero App Required',
    desc: 'The person receiving your contact info needs no app installed. Your profile opens instantly in their native mobile browser.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Privacy-First Architecture',
    desc: 'You choose exactly which details are visible. Zero identity tracking of scanners — stats are aggregate and anonymous by design.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Smart Analytics Panel',
    desc: 'Track your card view counts, top-clicked social handles, and geographic scan hotspots to measure your networking reach.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M16 8v8m-4-5v5m-4-2v2M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Wallet & Print Ready',
    desc: 'Add your contact card directly to Apple Wallet & Google Wallet, or download vector SVGs for physical card printing.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
];

export default function FeaturesGrid() {
  return (
    <div className="wrap features-section" id="features">
      <div className="section-head">
        <span className="section-eyebrow">Built for how you actually network</span>
        <h2>Everything you need, nothing you don't</h2>
        <p>Private by design, always current, works with a camera scan or a physical NFC tap.</p>
      </div>

      <div className="feature-grid">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            className="feat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -6, borderColor: 'rgba(255, 106, 44, 0.4)' }}
          >
            <div>
              <div className="feat-icon-badge">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
