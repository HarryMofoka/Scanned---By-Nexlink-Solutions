export const metadata = {
  title: 'About — Scanned by Nexlink Solutions',
  description: 'Learn about Scanned by Nexlink Solutions — the digital contact card platform for modern networking.',
};

export default function AboutPage() {
  return (
    <>
      <div className="wrap">
        <div className="page-hero">
          <span className="section-eyebrow">About us</span>
          <h1>Networking without friction</h1>
          <p>Scanned by Nexlink Solutions replaces paper business cards with an interactive digital profile card that's always up to date, shareable via QR code or NFC tap, and viewable by anyone — no app install required.</p>
        </div>
      </div>

      <div className="wrap">
        <div className="page-card">
          <h2>The Problem We Solve</h2>
          <p>Sharing contact info at events and meetings is friction-heavy — reading out phone numbers, spelling handles, or forcing people to search your name. Paper cards are static, costly, easily lost, and instantly outdated when your details change.</p>

          <h2>How It Works</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Create once, share forever</h3>
              <p>Install the app, add your name, phone, LinkedIn, and social handles. We generate a unique QR code and a web profile link instantly.</p>
            </div>
            <div className="info-card">
              <h3>QR + NFC Dual Sharing</h3>
              <p>Show your QR code to anyone — they scan with their smartphone camera and see your profile instantly. On mobile, write your profile link to any physical NFC card or sticker with one tap.</p>
            </div>
            <div className="info-card">
              <h3>Always current</h3>
              <p>Change your phone number or switch roles anytime. Every QR code and NFC tag you've already shared updates automatically in real-time — zero reprinting needed.</p>
            </div>
            <div className="info-card">
              <h3>Privacy by design</h3>
              <p>Only what you explicitly choose to share is public. We never track who scanned your card or sell personal data — all analytics are strictly anonymous.</p>
            </div>
          </div>

          <h2>Our Vision</h2>
          <p>We believe professional networking should be seamless and sustainable. One profile, always current, instantly accessible by anyone with a smartphone.</p>
          <p>Scanned by Nexlink Solutions is built for conference attendees, creators, architects, freelancers, executives, and anyone who values modern, frictionless connections.</p>
        </div>
      </div>
    </>
  );
}
