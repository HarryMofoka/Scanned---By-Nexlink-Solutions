'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';
import Toast from './Toast';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('links'); // 'info', 'links', 'activity'
  const [activeIcon, setActiveIcon] = useState(0); // sidebar icons 0-4
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'share', 'nfc', 'settings', 'add', 'scanners'
  const [modalTitle, setModalTitle] = useState('');
  
  // Dynamic Cards State
  const [contactCards, setContactCards] = useState([
    { id: 1, tag: 'Primary', tagClass: 'green', title: '+27 82 123 4567', meta: 'Added 12 Mar', meta2: 'Verified', views: '182 views', foot2: 'edited 2d ago' },
    { id: 2, tag: 'Email', tagClass: 'blue', title: 'thabo@nexlink.co.za', meta: 'Added 12 Mar', meta2: 'Secondary', views: '94 views' },
  ]);

  const [linkCards, setLinkCards] = useState([
    { id: 101, tag: 'LinkedIn', tagClass: 'blue', title: 'linkedin.com/in/thabo', meta: 'Added 12 Mar', meta2: 'Featured', views: '42 clicks', foot2: '+8 this wk' },
    { id: 102, tag: 'Instagram', tagClass: 'orange', title: '@thabo.codes', meta: 'Added 8 Mar', meta2: 'Public', views: '19 clicks' },
  ]);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  // Modal helper
  const openModal = (type, title) => {
    setActiveModal(type);
    setModalTitle(title);
  };
  const closeModal = () => setActiveModal(null);

  // New Link form state
  const [newItemType, setNewItemType] = useState('');
  const [newItemVal, setNewItemVal] = useState('');

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!newItemVal) return;
    const newCard = {
      id: Date.now(),
      tag: newItemType || 'Custom',
      tagClass: 'green',
      title: newItemVal,
      meta: 'Added Just Now',
      meta2: 'Active',
      views: '0 clicks',
    };
    setLinkCards((prev) => [...prev, newCard]);
    addToast(`Added ${newCard.tag} card: "${newCard.title}"!`);
    setNewItemType('');
    setNewItemVal('');
    closeModal();
  };

  const handleCopy = (text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    addToast(`Copied "${text}" to clipboard!`);
  };

  return (
    <div className="panel-frame">
      <Toast toasts={toasts} />

      {/* Shared Modals */}
      <Modal isOpen={activeModal === 'share'} onClose={closeModal} title={modalTitle}>
        <p className="modal-sub">Anyone scanning this QR code will see your profile instantly in their browser.</p>
        <div style={{ background: '#fff', padding: '24px', borderRadius: '20px', width: '180px', height: '180px', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 40 40" style={{ width: '100%', height: '100%' }}>
            <rect width="40" height="40" fill="#fff" />
            <g fill="#050505">
              <rect x="2" y="2" width="10" height="10" />
              <rect x="4" y="4" width="6" height="6" fill="#fff" />
              <rect x="5" y="5" width="4" height="4" />
              <rect x="28" y="2" width="10" height="10" />
              <rect x="30" y="4" width="6" height="6" fill="#fff" />
              <rect x="31" y="5" width="4" height="4" />
              <rect x="2" y="28" width="10" height="10" />
              <rect x="4" y="30" width="6" height="6" fill="#fff" />
              <rect x="5" y="31" width="4" height="4" />
              <rect x="16" y="4" width="4" height="4" />
              <rect x="22" y="8" width="4" height="4" />
              <rect x="16" y="16" width="8" height="8" />
              <rect x="26" y="18" width="4" height="4" />
              <rect x="18" y="26" width="4" height="4" />
              <rect x="28" y="28" width="8" height="8" />
              <rect x="16" y="34" width="4" height="4" />
            </g>
          </svg>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <button
            className="btn-solid-pill"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => handleCopy('https://scanned.co/thabo.molefe')}
          >
            Copy Profile URL
          </button>
          <button
            className="btn-ghost-pill"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { addToast('Downloading QR Code SVG...'); closeModal(); }}
          >
            Download High-Res SVG
          </button>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'nfc'} onClose={closeModal} title={modalTitle}>
        <p className="modal-sub">Program your Scanned profile URL to a physical NFC card or sticker.</p>
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
          <div style={{ width: '80px', height: '80px', margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(255,106,44,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff6a2c" strokeWidth="2"><path d="M6 8C8 6 16 6 18 8M4 12C7.5 9 16.5 9 20 12M8 16C9.5 14.7 14.5 14.7 16 16" /></svg>
          </div>
          <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Ready to Write</p>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)' }}>Hold your blank NFC tag near your device.</p>
        </div>
        <button
          className="btn-solid-pill"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => { addToast('⚡ Success! NFC Tag written to profile URL'); closeModal(); }}
        >
          Simulate NFC Tag Touch
        </button>
      </Modal>

      <Modal isOpen={activeModal === 'settings'} onClose={closeModal} title={modalTitle}>
        <p className="modal-sub">Customize your digital profile card parameters.</p>
        <div className="form-group">
          <label>Card Title</label>
          <input type="text" defaultValue="Thabo Molefe — Lead Architect" />
        </div>
        <div className="form-group">
          <label>Custom Profile Handle</label>
          <input type="text" defaultValue="scanned.co/thabo" />
        </div>
        <button
          className="btn-solid-pill"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => { addToast('Card settings saved!'); closeModal(); }}
        >
          Save Settings
        </button>
      </Modal>

      <Modal isOpen={activeModal === 'add'} onClose={closeModal} title={modalTitle}>
        <form onSubmit={handleAddLink}>
          <p className="modal-sub">Add a new link or contact detail to your card profile.</p>
          <div className="form-group">
            <label>Title / Platform</label>
            <input
              type="text"
              placeholder="e.g. WhatsApp, Portfolio, GitHub"
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>URL or Detail</label>
            <input
              type="text"
              placeholder="e.g. github.com/user or +27 82 999 0000"
              value={newItemVal}
              onChange={(e) => setNewItemVal(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-solid-pill" style={{ width: '100%', justifyContent: 'center' }}>
            Add to Profile
          </button>
        </form>
      </Modal>

      <Modal isOpen={activeModal === 'scanners'} onClose={closeModal} title={modalTitle}>
        <p className="modal-sub">Anonymous view log — location hotspots & timestamps.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#161614', borderRadius: '12px', fontSize: '13.5px' }}>
            <span>📱 NFC Tap — Sandton, JHB</span>
            <span style={{ color: 'var(--accent-1)', fontWeight: 600 }}>Today, 14:32</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#161614', borderRadius: '12px', fontSize: '13.5px' }}>
            <span>📷 QR Camera Scan — Rosebank</span>
            <span style={{ color: 'var(--text-muted)' }}>Yesterday, 09:10</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#161614', borderRadius: '12px', fontSize: '13.5px' }}>
            <span>📷 QR Camera Scan — Cape Town</span>
            <span style={{ color: 'var(--text-muted)' }}>10 Mar, 18:45</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#161614', borderRadius: '12px', fontSize: '13.5px' }}>
            <span>📱 NFC Tap — TechSummit Conference</span>
            <span style={{ color: 'var(--text-muted)' }}>09 Mar, 11:20</span>
          </div>
        </div>
      </Modal>

      {/* Main Panel View */}
      <div className="panel">
        <div className="panel-inner">
          {/* Sidebar */}
          <div className="p-sidebar">
            <div className="s-logo">
              <svg viewBox="0 0 30 26" fill="none" width="20" height="18">
                <rect x="0" y="17" width="30" height="6" rx="3" fill="#ff6a2c" />
                <rect x="4" y="9" width="22" height="6" rx="3" fill="#ff6a2c" opacity=".8" />
                <rect x="8" y="1" width="14" height="6" rx="3" fill="#ff6a2c" opacity=".55" />
              </svg>
            </div>
            
            <div
              className={`s-icon ${activeIcon === 0 ? 'active' : ''}`}
              title="Dashboard"
              onClick={() => { setActiveIcon(0); setActiveTab('links'); addToast('Viewing Full Dashboard'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={activeIcon === 0 ? '#fff' : '#9a9691'} strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>

            <div
              className={`s-icon ${activeIcon === 1 ? 'active' : ''}`}
              title="Contact Cards"
              onClick={() => { setActiveIcon(1); setActiveTab('info'); addToast('Viewing Contact Info View'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={activeIcon === 1 ? '#fff' : '#9a9691'} strokeWidth="1.8">
                <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 4v16" />
              </svg>
            </div>

            <div
              className={`s-icon ${activeIcon === 2 ? 'active' : ''}`}
              title="Analytics"
              onClick={() => { setActiveIcon(2); document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' }); addToast('Navigating to Analytics'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={activeIcon === 2 ? '#fff' : '#9a9691'} strokeWidth="1.8">
                <path d="M4 20V10M12 20V4M20 20v-7" />
              </svg>
            </div>

            <div
              className={`s-icon ${activeIcon === 3 ? 'active' : ''}`}
              title="Write NFC"
              onClick={() => { setActiveIcon(3); openModal('nfc', 'Write NFC Tag'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={activeIcon === 3 ? '#fff' : '#9a9691'} strokeWidth="1.8">
                <path d="M6 8C8 6 16 6 18 8M4 12C7.5 9 16.5 9 20 12M8 16C9.5 14.7 14.5 14.7 16 16" />
              </svg>
            </div>

            <div
              className={`s-icon ${activeIcon === 4 ? 'active' : ''}`}
              title="Settings"
              onClick={() => { setActiveIcon(4); openModal('settings', 'Card Settings'); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={activeIcon === 4 ? '#fff' : '#9a9691'} strokeWidth="1.8">
                <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
              </svg>
            </div>
          </div>

          <div className="p-main">
            {/* Header */}
            <div className="p-head">
              <div className="p-title">My Card</div>
              <div className="p-filters">
                <div
                  className={`filter-pill ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('info'); addToast('Filtered: Contact Info'); }}
                >
                  Info
                </div>
                <div
                  className={`filter-pill ${activeTab === 'links' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('links'); addToast('Filtered: Links'); }}
                >
                  Links
                </div>
                <div
                  className={`filter-pill ${activeTab === 'activity' ? 'active' : ''}`}
                  onClick={() => { setActiveTab('activity'); addToast('Filtered: Recent Activity'); }}
                >
                  Activity
                </div>
                <div className="p-search">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#726e6a" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search your links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Header Row 2 */}
            <div className="p-head-row2">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  className="avatar-stack"
                  title="Click to view scanner log"
                  onClick={() => openModal('scanners', 'Scanned by 13 People This Week')}
                >
                  <div className="av av1">A</div>
                  <div className="av av2">M</div>
                  <div className="av av3">K</div>
                  <div className="av av4">R</div>
                  <div className="more">+9</div>
                </div>
                <span
                  className="avatar-label"
                  onClick={() => openModal('scanners', 'Scanned by 13 People This Week')}
                >
                  Scanned by 13 people this week
                </span>
              </div>

              <div className="p-actions">
                <button
                  className="btn-share"
                  onClick={() => openModal('share', 'Share Your Contact Card')}
                >
                  Share card
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div
                  className="btn-slider"
                  title="Reset layout view"
                  onClick={() => { setActiveTab('links'); addToast('Reset view layout'); }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9a9691" strokeWidth="1.8">
                    <path d="M4 7h4M4 12h9M4 17h6" />
                    <circle cx="10" cy="7" r="1.6" fill="#9a9691" stroke="none" />
                    <circle cx="15" cy="12" r="1.6" fill="#9a9691" stroke="none" />
                    <circle cx="12" cy="17" r="1.6" fill="#9a9691" stroke="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 3 Columns Layout */}
            <div className="columns">
              {/* Column 1: Contact Info */}
              {(activeTab === 'links' || activeTab === 'info') && (
                <div className="column">
                  <div className="col-head">
                    <div className="left">Contact info <span className="count-badge">{contactCards.length}</span></div>
                    <div className="right">
                      <div className="mini-btn" onClick={() => addToast('Contact info options')}>⋯</div>
                      <div className="mini-btn" onClick={() => openModal('add', 'Add Contact Item')}>+</div>
                    </div>
                  </div>

                  {contactCards
                    .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((card) => (
                      <motion.div
                        key={card.id}
                        className="card-item"
                        whileHover={{ y: -2 }}
                        onClick={() => handleCopy(card.title)}
                      >
                        <div className="card-item-top">
                          <span className={`tag ${card.tagClass}`}>{card.tag}</span>
                          <div className="card-avatar" style={{ background: '#8c97f5' }}></div>
                        </div>
                        <div className="card-title">{card.title}</div>
                        <div className="card-meta">
                          <span className="with-icon">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#726e6a" strokeWidth="2">
                              <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" />
                            </svg>
                            {card.meta}
                          </span>
                          <span>{card.meta2}</span>
                        </div>
                        <div className="card-foot">
                          <span>{card.views}</span>
                          {card.foot2 && <span>{card.foot2}</span>}
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}

              {/* Column 2: Your Links */}
              {(activeTab === 'links') && (
                <div className="column">
                  <div className="col-head">
                    <div className="left">Your links <span className="count-badge">{linkCards.length}</span></div>
                    <div className="right">
                      <div className="mini-btn" onClick={() => addToast('Links column options')}>⋯</div>
                      <div className="mini-btn" onClick={() => openModal('add', 'Add New Link')}>+</div>
                    </div>
                  </div>

                  {linkCards
                    .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((card) => (
                      <motion.div
                        key={card.id}
                        className="card-item"
                        whileHover={{ y: -2 }}
                        onClick={() => handleCopy(card.title)}
                      >
                        <div className="card-item-top">
                          <span className={`tag ${card.tagClass}`}>{card.tag}</span>
                          <div className="card-avatar" style={{ background: '#ff6a2c' }}></div>
                        </div>
                        <div className="card-title">{card.title}</div>
                        <div className="card-meta">
                          <span className="with-icon">{card.meta}</span>
                          <span>{card.meta2}</span>
                        </div>
                        <div className="card-foot">
                          <span>{card.views}</span>
                          {card.foot2 && <span>{card.foot2}</span>}
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}

              {/* Column 3: Recent Activity */}
              {(activeTab === 'links' || activeTab === 'activity') && (
                <div className="column">
                  <div className="col-head">
                    <div className="left">Recent activity <span className="count-badge">2</span></div>
                    <div className="right">
                      <div className="mini-btn" onClick={() => addToast('Activity options')}>⋯</div>
                      <div className="mini-btn" onClick={() => addToast('Log new activity')}>+</div>
                    </div>
                  </div>

                  <div className="card-item" onClick={() => handleCopy('QR View in Sandton')}>
                    <div className="card-item-top"><span className="tag green">Scan</span><div className="card-avatar" style={{ background: '#e8480f' }}></div></div>
                    <div className="card-title">Card viewed via QR</div>
                    <div className="card-meta"><span class="with-icon">Today, 14:32</span><span>Sandton</span></div>
                    <div className="card-foot"><span>Mobile</span></div>
                  </div>

                  <div className="card-item" onClick={() => handleCopy('NFC Tap in Rosebank')}>
                    <div className="card-item-top"><span className="tag orange">NFC</span><div className="card-avatar" style={{ background: '#8c97f5' }}></div></div>
                    <div className="card-title">Card tapped via NFC</div>
                    <div className="card-meta"><span className="with-icon">Yesterday, 09:10</span><span>Rosebank</span></div>
                    <div className="card-foot"><span>Mobile</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
