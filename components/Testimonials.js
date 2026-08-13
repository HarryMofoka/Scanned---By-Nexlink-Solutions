'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: '"Scanned by Nexlink Solutions eliminated paper card waste at our 500-person tech summit. Attendees loved tapping their phones to exchange LinkedIn profiles in seconds."',
    name: 'Sarah Jenkins',
    role: 'Event Director • TechSummit',
    avatar: 'SJ',
    bg: 'linear-gradient(135deg, var(--accent-1), var(--accent-2))',
  },
  {
    quote: '"I changed my phone number while traveling overseas. Every client who tapped my NFC tag got the updated number immediately without me needing to send a follow-up text."',
    name: 'Marcus Vance',
    role: 'Lead Architect • Studio V',
    avatar: 'MV',
    bg: 'var(--accent-1)',
  },
  {
    quote: '"The NFC tap feels like magic. People are genuinely blown away when my portfolio and contact links open instantly on their phone with zero app download."',
    name: 'Elena Rostova',
    role: 'Creative Strategist • Pulse Media',
    avatar: 'ER',
    bg: '#5b64c9',
  },
];

export default function Testimonials() {
  return (
    <div className="wrap testimonials-section" id="testimonials">
      <div className="section-head">
        <span className="section-eyebrow">Trusted by professionals</span>
        <h2>Loved by networkers & event leaders worldwide</h2>
        <p>See why top executives, freelancers, and event organizers rely on Scanned by Nexlink Solutions.</p>
      </div>

      <div className="proof-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="proof-stars">★★★★★</div>
          <div>
            <div className="proof-rating-text">Rated 4.9/5 by over 2,500+ professionals</div>
            <div className="proof-rating-sub">Used at summits, meetups, and daily meetings across Africa & globally</div>
          </div>
        </div>
        <div className="avatar-stack">
          <div className="av av1">S</div>
          <div className="av av2">M</div>
          <div className="av av3">E</div>
          <div className="av av4">T</div>
          <div className="more">+2k</div>
        </div>
      </div>

      <div className="test-grid">
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            className="test-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <p className="test-quote">{item.quote}</p>
            <div className="test-author">
              <div className="test-avatar" style={{ background: item.bg }}>{item.avatar}</div>
              <div className="test-info">
                <h4>{item.name}</h4>
                <p>{item.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="logos-strip">
        <span className="logo-item">TechSummit</span>
        <span className="logo-item">Global Scale</span>
        <span className="logo-item">LaunchPad 2026</span>
        <span className="logo-item">SummitX</span>
        <span className="logo-item">Innovate Group</span>
      </div>
    </div>
  );
}
