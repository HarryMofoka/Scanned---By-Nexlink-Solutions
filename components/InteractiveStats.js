'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const weeklyData = [
  { day: 'Mon', count: 128, height: '45%' },
  { day: 'Tue', count: 276, height: '65%' },
  { day: 'Wed', count: 346, height: '80%' },
  { day: 'Thu ★', count: 400, height: '100%', isPeak: true },
  { day: 'Fri', count: 310, height: '70%' },
  { day: 'Sat', count: 118, height: '40%' },
];

export default function InteractiveStats() {
  const [selectedDay, setSelectedDay] = useState(weeklyData[3]);

  return (
    <div className="wrap stats-section" id="stats">
      <div className="section-head">
        <span className="section-eyebrow">Know your reach</span>
        <h2>Track your networking performance in real time</h2>
        <p>Clean, anonymous view counts and click breakdowns so you know your card is working for you.</p>
      </div>

      <div className="stats-panel-box">
        <div className="stats-grid">
          <div>
            <div className="chart-header">
              <span className="chart-title">Weekly Interactions</span>
              <span className="chart-tag">● Live Analytics</span>
            </div>

            <div className="bars-container">
              {weeklyData.map((item, idx) => (
                <div
                  key={idx}
                  className={`bar-col ${item.isPeak ? 'peak' : ''}`}
                  onClick={() => setSelectedDay(item)}
                >
                  <div className="bar-wrapper" style={{ height: '100%' }}>
                    <motion.div
                      className="bar-fill"
                      initial={{ height: 0 }}
                      whileInView={{ height: item.height }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                    />
                    <span className="bar-val">{item.count}</span>
                  </div>
                  <span className="bar-label">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="stat-metrics">
              <motion.div className="metric-card" whileHover={{ y: -3 }}>
                <div className="metric-val">1.4k+</div>
                <span className="metric-sub">+24% this mo</span>
                <div className="metric-desc">Total card scans</div>
              </motion.div>

              <motion.div className="metric-card" whileHover={{ y: -3 }}>
                <div className="metric-val">890</div>
                <span className="metric-sub">62% ratio</span>
                <div className="metric-desc">NFC tap shares</div>
              </motion.div>

              <motion.div className="metric-card" whileHover={{ y: -3 }}>
                <div className="metric-val">99.8%</div>
                <span className="metric-sub">&lt; 0.4s load</span>
                <div className="metric-desc">Scan success rate</div>
              </motion.div>

              <motion.div className="metric-card" whileHover={{ y: -3 }}>
                <div className="metric-val">4.9 ★</div>
                <span className="metric-sub">2,500+ reviews</span>
                <div className="metric-desc">User rating</div>
              </motion.div>
            </div>

            <div className="channel-strip">
              <div className="chan-pill">LinkedIn <b>48%</b></div>
              <div className="chan-pill">WhatsApp <b>26%</b></div>
              <div className="chan-pill">Portfolio <b>18%</b></div>
              <div className="chan-pill">Direct Call <b>8%</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
