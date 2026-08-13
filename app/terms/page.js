export const metadata = {
  title: 'Terms of Service — Scanned by Nexlink Solutions',
  description: 'Terms of Service for Scanned by Nexlink Solutions — guidelines for using our digital contact card service.',
};

export default function TermsPage() {
  return (
    <>
      <div className="wrap">
        <div className="page-hero">
          <span className="section-eyebrow">Legal</span>
          <h1>Terms of Service</h1>
          <p>Last updated: March 12, 2026. Please read these terms carefully before using Scanned by Nexlink Solutions.</p>
        </div>
      </div>

      <div className="wrap">
        <div className="page-card">
          <h2>1. Acceptance of Terms</h2>
          <p>By creating an account or accessing Scanned by Nexlink Solutions, you agree to comply with and be bound by these Terms of Service.</p>

          <h2>2. Acceptable Use</h2>
          <p>You agree to provide accurate contact information and use the platform exclusively for lawful professional networking. You may not publish malicious links, impersonate individuals without authorization, or engage in spam.</p>

          <h2>3. Public Profile Visibility</h2>
          <p>You understand that details added to your contact card profile are intended for public sharing when scanned via QR code or NFC tap. You can modify or remove public fields at any time.</p>

          <h2>4. Intellectual Property</h2>
          <p>Scanned by Nexlink Solutions retains all rights, title, and interest in and to the platform design, software code, brand assets, and logo marks.</p>

          <h2>5. Limitation of Liability</h2>
          <p>The platform is provided "as is." We strive for maximum uptime and reliability, but cannot guarantee uninterrupted service availability at all times.</p>

          <h2>6. Termination</h2>
          <p>You may delete your account at any time. We reserve the right to suspend or terminate accounts violating these terms.</p>
        </div>
      </div>
    </>
  );
}
