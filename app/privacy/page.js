export const metadata = {
  title: 'Privacy Policy — Scanned by Nexlink Solutions',
  description: 'Privacy Policy for Scanned by Nexlink Solutions — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <>
      <div className="wrap">
        <div className="page-hero">
          <span className="section-eyebrow">Legal</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: March 12, 2026. We are committed to protecting your privacy and being transparent about data handling.</p>
        </div>
      </div>

      <div className="wrap">
        <div className="page-card">
          <h2>1. Overview</h2>
          <p>Scanned by Nexlink Solutions ("we," "our," or "us") provides a digital contact card platform allowing users to create, update, and share professional profiles via QR codes and NFC tags. This Privacy Policy explains how we collect, use, and protect your information.</p>

          <h2>2. Data We Collect</h2>
          <p><strong>Account Data:</strong> Email address and encrypted password hash (or authentication tokens if signing in with Google or Apple).</p>
          <p><strong>Profile Data:</strong> Name, phone number, job title, and social links that you explicitly choose to add to your contact card.</p>
          <p><strong>Anonymous Analytics:</strong> Aggregate count of profile views and click events. We do NOT track individual scanner identities or store IP addresses of recipients viewing public profiles.</p>

          <h2>3. How We Use Data</h2>
          <p>We use your information solely to host your public profile page, render your QR code, provide profile management features, and display total view metrics on your personal dashboard.</p>

          <h2>4. Data Sharing & Third Parties</h2>
          <p>We NEVER sell your personal data. Only the contact details you explicitly mark as public will be visible to people scanning your QR code or NFC tag.</p>

          <h2>5. Security & Protection</h2>
          <p>All data in transit is encrypted using HTTPS/TLS. Passwords are securely hashed. Storage access is governed by strict Row-Level Security policies.</p>

          <h2>6. Your Rights</h2>
          <p>You can update, edit, or permanently delete your contact profile and account at any time through your dashboard settings.</p>

          <h2>7. Contact Us</h2>
          <p>For privacy questions or data deletion requests, contact us at <a href="mailto:privacy@nexlink.co.za">privacy@nexlink.co.za</a>.</p>
        </div>
      </div>
    </>
  );
}
