/* ======================================================
   Scanned by Nexlink Solutions — Fully Interactive Dashboard & App
   ====================================================== */

import { initLenis }      from './lenis.js';
import { initAnimations } from './animations.js';
import { initScene }      from './scene.js';
import { initMenu }       from './menu.js';

// ── Toast Notification Helper ──────────────────────────
export function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6a2c" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ── Modal Helper ──────────────────────────────────────
export function openModal(title, contentHtml) {
  let modal = document.querySelector('.modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-card">
        <button class="modal-close">&times;</button>
        <div class="modal-title"></div>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  modal.querySelector('.modal-title').textContent = title;
  modal.querySelector('.modal-body').innerHTML = contentHtml;
  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll
  if (typeof ScrollTrigger !== 'undefined') {
    initLenis(ScrollTrigger);
  }

  // 2. Mobile Menu
  initMenu();

  // 3. GSAP animations
  if (typeof gsap !== 'undefined' && (document.querySelector('.hero') || document.querySelector('.section'))) {
    initAnimations();
  }

  // 4. Three.js particles
  initScene();

  // 5. FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.faq-item').classList.toggle('is-open');
    });
  });

  // 6. Interactive Sidebar Icons
  const sidebarIcons = document.querySelectorAll('.p-sidebar .s-icon');
  sidebarIcons.forEach((icon, idx) => {
    icon.addEventListener('click', () => {
      sidebarIcons.forEach(i => i.classList.remove('active'));
      icon.classList.add('active');

      if (idx === 0) { // Grid/Dashboard
        showToast('Viewing My Card Dashboard');
        document.querySelectorAll('.columns .column').forEach(c => c.style.display = 'block');
      } else if (idx === 1) { // Contact Cards
        showToast('Viewing Contact Info View');
        const cols = document.querySelectorAll('.columns .column');
        cols[0].style.display = 'block';
        cols[1].style.display = 'none';
        cols[2].style.display = 'none';
      } else if (idx === 2) { // Analytics View
        showToast('Opening Real-Time Analytics');
        document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' });
      } else if (idx === 3) { // NFC Writer Simulation
        openModal('Write NFC Tag', `
          <p class="modal-sub">Program your Scanned profile URL to a physical NFC card or sticker.</p>
          <div style="text-align:center;padding:30px 0;">
            <div style="width:80px;height:80px;margin:0 auto 16px;border-radius:50%;background:rgba(255,106,44,0.15);display:flex;align-items:center;justify-content:center;border:2px stroke var(--accent-1);">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff6a2c" stroke-width="2"><path d="M6 8C8 6 16 6 18 8M4 12C7.5 9 16.5 9 20 12M8 16C9.5 14.7 14.5 14.7 16 16"/></svg>
            </div>
            <p style="font-weight:700;font-size:16px;margin-bottom:6px;">Ready to Write</p>
            <p style="font-size:13.5px;color:var(--text-muted);">Hold your blank NFC tag near the top of your device.</p>
          </div>
          <button id="btn-nfc-write-sim" class="btn-solid-pill" style="width:100%;text-align:center;justify-content:center;padding:14px;">Simulate NFC Tag Touch</button>
        `);
        document.getElementById('btn-nfc-write-sim')?.addEventListener('click', () => {
          showToast('⚡ Success! NFC Tag written to profile URL');
          closeModal();
        });
      } else if (idx === 4) { // Settings Modal
        openModal('Card Settings', `
          <p class="modal-sub">Customize your digital profile card parameters.</p>
          <div class="form-group">
            <label>Card Name</label>
            <input type="text" value="Thabo Molefe — Lead Architect" />
          </div>
          <div class="form-group">
            <label>Custom Profile Handle</label>
            <input type="text" value="scanned.co/thabo" />
          </div>
          <button id="btn-save-settings" class="btn-solid-pill" style="width:100%;text-align:center;justify-content:center;padding:14px;">Save Settings</button>
        `);
        document.getElementById('btn-save-settings')?.addEventListener('click', () => {
          showToast('Card settings updated successfully!');
          closeModal();
        });
      }
    });
  });

  // 7. Interactive Filter Pills
  const filterPills = document.querySelectorAll('.p-filters .filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const pillText = pill.textContent.trim().toLowerCase();
      const cols = document.querySelectorAll('.columns .column');

      if (pillText === 'info') {
        cols[0].style.display = 'block';
        cols[1].style.display = 'none';
        cols[2].style.display = 'none';
        showToast('Filtered: Contact Info');
      } else if (pillText === 'links') {
        cols[0].style.display = 'block';
        cols[1].style.display = 'block';
        cols[2].style.display = 'none';
        showToast('Filtered: Social Links');
      } else if (pillText === 'activity') {
        cols[0].style.display = 'none';
        cols[1].style.display = 'none';
        cols[2].style.display = 'block';
        showToast('Filtered: Recent Activity');
      }
    });
  });

  // 8. Live Search Filter
  const searchInput = document.querySelector('.p-search input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cardItems = document.querySelectorAll('.card-item');
      let count = 0;
      cardItems.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(q)) {
          card.style.display = 'block';
          count++;
        } else {
          card.style.display = 'none';
        }
      });
      if (q.length > 0 && count === 0) {
        showToast(`No links match "${q}"`);
      }
    });
  }

  // 9. Share Card Button Modal
  const btnShare = document.querySelector('.btn-share');
  if (btnShare) {
    btnShare.addEventListener('click', () => {
      openModal('Share Your Contact Card', `
        <p class="modal-sub">Anyone scanning this QR code will see your profile instantly in their browser.</p>
        <div style="background:#fff;padding:24px;border-radius:20px;width:180px;height:180px;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 40 40" style="width:100%;height:100%;">
            <rect width="40" height="40" fill="#fff"/>
            <g fill="#050505">
              <rect x="2" y="2" width="10" height="10"/>
              <rect x="4" y="4" width="6" height="6" fill="#fff"/>
              <rect x="5" y="5" width="4" height="4"/>
              <rect x="28" y="2" width="10" height="10"/>
              <rect x="30" y="4" width="6" height="6" fill="#fff"/>
              <rect x="31" y="5" width="4" height="4"/>
              <rect x="2" y="28" width="10" height="10"/>
              <rect x="4" y="30" width="6" height="6" fill="#fff"/>
              <rect x="5" y="31" width="4" height="4"/>
              <rect x="16" y="4" width="4" height="4"/>
              <rect x="22" y="8" width="4" height="4"/>
              <rect x="16" y="16" width="8" height="8"/>
              <rect x="26" y="18" width="4" height="4"/>
              <rect x="18" y="26" width="4" height="4"/>
              <rect x="28" y="28" width="8" height="8"/>
              <rect x="16" y="34" width="4" height="4"/>
            </g>
          </svg>
        </div>
        <div style="display:flex;gap:10px;flex-direction:column;">
          <button id="btn-copy-link" class="btn-solid-pill" style="width:100%;text-align:center;justify-content:center;">Copy Profile URL</button>
          <button id="btn-dl-qr" class="btn-ghost-pill" style="width:100%;text-align:center;justify-content:center;">Download High-Res SVG</button>
        </div>
      `);

      document.getElementById('btn-copy-link')?.addEventListener('click', () => {
        navigator.clipboard?.writeText('https://scanned.co/thabo.molefe');
        showToast('Copied https://scanned.co/thabo.molefe to clipboard!');
      });

      document.getElementById('btn-dl-qr')?.addEventListener('click', () => {
        showToast('Downloading QR Code (SVG)...');
      });
    });
  }

  // 10. Slider Filter Button layout toggle
  const btnSlider = document.querySelector('.btn-slider');
  if (btnSlider) {
    btnSlider.addEventListener('click', () => {
      const cols = document.querySelector('.columns');
      if (cols) {
        cols.querySelectorAll('.column').forEach(col => col.style.display = 'block');
        showToast('Reset dashboard view to all 3 columns');
      }
    });
  }

  // 11. Column Headers `+` Add Button
  document.querySelectorAll('.col-head .right .mini-btn:last-child').forEach((btn, colIdx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal('Add New Card Link', `
        <p class="modal-sub">Add a new link or detail to your card profile.</p>
        <div class="form-group">
          <label>Title / Type</label>
          <input type="text" id="new-item-type" placeholder="e.g. WhatsApp, Portfolio, GitHub" />
        </div>
        <div class="form-group">
          <label>URL or Value</label>
          <input type="text" id="new-item-val" placeholder="e.g. +27 82 999 0000 or github.com/user" />
        </div>
        <button id="btn-add-item-submit" class="btn-solid-pill" style="width:100%;text-align:center;justify-content:center;">Add to Profile</button>
      `);

      document.getElementById('btn-add-item-submit')?.addEventListener('click', () => {
        const type = document.getElementById('new-item-type').value || 'New Link';
        const val = document.getElementById('new-item-val').value || 'scanned.co/link';

        const col = document.querySelectorAll('.columns .column')[colIdx];
        if (col) {
          const newCard = document.createElement('div');
          newCard.className = 'card-item';
          newCard.innerHTML = `
            <div class="card-item-top"><span class="tag green">${type}</span><div class="card-avatar" style="background:var(--accent-1);"></div></div>
            <div class="card-title">${val}</div>
            <div class="card-meta"><span class="with-icon">Added Just Now</span><span>Active</span></div>
            <div class="card-foot"><span>0 views</span></div>
          `;
          col.appendChild(newCard);
          newCard.addEventListener('click', () => {
            navigator.clipboard?.writeText(val);
            showToast(`Copied ${val} to clipboard!`);
          });
        }
        showToast(`Added ${type} card item!`);
        closeModal();
      });
    });
  });

  // 12. Column Headers `⋯` Options Button
  document.querySelectorAll('.col-head .right .mini-btn:first-child').forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast(`Column ${idx + 1} options: Drag to reorder active`);
    });
  });

  // 13. Clickable Card Items (Copy content & Toast)
  document.querySelectorAll('.card-item').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.card-title')?.textContent || 'Card item';
      navigator.clipboard?.writeText(title);
      showToast(`Copied "${title}" to clipboard!`);
    });
  });

  // 14. Avatar Stack & Scanned Label (Recent Scanners Modal)
  const avatarStack = document.querySelector('.avatar-stack');
  const avatarLabel = document.querySelector('.avatar-label');
  const openScannersModal = () => {
    openModal('Scanned by 13 People This Week', `
      <p class="modal-sub">Anonymous view log — location hotspots & timestamps.</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;padding:12px;background:#161614;border-radius:12px;font-size:13.5px;">
          <span>📱 NFC Tap — Sandton, JHB</span><span style="color:var(--accent-1);font-weight:600;">Today, 14:32</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:12px;background:#161614;border-radius:12px;font-size:13.5px;">
          <span>📷 QR Camera Scan — Rosebank</span><span style="color:var(--text-muted);">Yesterday, 09:10</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:12px;background:#161614;border-radius:12px;font-size:13.5px;">
          <span>📷 QR Camera Scan — Cape Town</span><span style="color:var(--text-muted);">10 Mar, 18:45</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:12px;background:#161614;border-radius:12px;font-size:13.5px;">
          <span>📱 NFC Tap — TechSummit Conference</span><span style="color:var(--text-muted);">09 Mar, 11:20</span>
        </div>
      </div>
    `);
  };
  if (avatarStack) avatarStack.addEventListener('click', openScannersModal);
  if (avatarLabel) avatarLabel.addEventListener('click', openScannersModal);

  // 15. Stats Section Interactions
  document.querySelectorAll('.bar-col').forEach(bar => {
    bar.addEventListener('click', () => {
      const val = bar.querySelector('.bar-val')?.textContent || '0';
      const label = bar.querySelector('.bar-label')?.textContent || '';
      showToast(`Selected ${label}: ${val} card interactions`);
    });
  });

  document.querySelectorAll('.metric-card').forEach(metric => {
    metric.addEventListener('click', () => {
      const desc = metric.querySelector('.metric-desc')?.textContent || 'Metric';
      const val = metric.querySelector('.metric-val')?.textContent || '';
      showToast(`${desc}: ${val}`);
    });
  });

  document.querySelectorAll('.chan-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      showToast(`Link Channel: ${pill.textContent}`);
    });
  });
});
