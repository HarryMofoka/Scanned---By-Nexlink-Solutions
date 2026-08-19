'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Does the person scanning my card need an app?',
    a: 'No! Anyone who scans your QR code or taps your NFC tag views your responsive contact card instantly in their device\'s default web browser (Safari, Chrome, etc.). No app download is required for them.',
  },
  {
    q: 'How do I write my link to an NFC tag?',
    a: 'Download the mobile app for Android, open the app, and tap the "Write NFC Tag" button on your card dashboard. Hold your blank physical NFC card or sticker against your phone to program it instantly.',
  },
  {
    q: 'What happens when I change my phone number or social links?',
    a: 'Simply open your app and update your details. Your live profile updates instantly — every physical QR printout and NFC tag you\'ve already shared will automatically direct to your updated info.',
  },
  {
    q: 'Is my information private?',
    a: 'Yes. Only the fields you explicitly choose to include on your card are visible. We never track individual scanner identities or sell your data.',
  },
  {
    q: 'Can I download my QR code for printing?',
    a: 'Yes. You can download high-resolution PNG or SVG vector files of your unique QR code directly from your app dashboard to print on business cards, stickers, or badges.',
  },
];

export default function SupportPage() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <>
      <div className="wrap">
        <div className="page-hero">
          <span className="section-eyebrow">Help Center</span>
          <h1>How can we help you?</h1>
          <p>Find quick answers to common questions about setting up, updating, and sharing your digital contact card.</p>
        </div>
      </div>

      <div className="wrap">
        <div className="page-card">
          <h2>Frequently Asked Questions</h2>

          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openIdx === idx ? 'is-open' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(idx)}>
                {faq.q}
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}

          <h2 style={{ marginTop: '40px' }}>Need Direct Support?</h2>
          <p>Have a question not answered above or need assistance with enterprise team cards? Contact our support team at <a href="mailto:support@nexlink.co.za">support@nexlink.co.za</a> and we'll get back to you within 24 hours.</p>
        </div>
      </div>
    </>
  );
}
