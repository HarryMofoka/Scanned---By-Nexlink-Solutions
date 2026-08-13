import Link from 'next/link';

export default function Footer() {
  return (
    <div className="wrap" style={{ padding: '40px 0 60px' }}>
      <footer>
        <Link href="/" className="logo" style={{ justifyContent: 'center' }}>
          <div className="logo-mark">
            <svg viewBox="0 0 30 26" fill="none">
              <rect x="0" y="17" width="30" height="6" rx="3" fill="#ff6a2c" />
              <rect x="4" y="9" width="22" height="6" rx="3" fill="#ff6a2c" opacity=".8" />
              <rect x="8" y="1" width="14" height="6" rx="3" fill="#ff6a2c" opacity=".55" />
            </svg>
          </div>
          <div className="logo-text" style={{ textAlign: 'left' }}>
            <span className="brand-title">Scanned</span>
            <span className="brand-sub">by Nexlink Solutions</span>
          </div>
        </Link>
        <div className="foot-links">
          <Link href="/privacy">Privacy policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/support">Support</Link>
          <Link href="/about">About</Link>
          <a href="#">© 2026 Scanned by Nexlink Solutions</a>
        </div>
      </footer>
    </div>
  );
}
