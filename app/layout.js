import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL('https://scanned.co'),
  title: 'Scanned by Nexlink Solutions — Your contact card, one tap away',
  description: 'Build your contact card once. Share your phone, LinkedIn, and socials with a single QR code or NFC tap — no app required for the recipient.',
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: 'Scanned by Nexlink Solutions — Your contact card, one tap away',
    description: 'Build your contact card once. Share your phone, LinkedIn, and socials with a single QR code or NFC tap.',
    images: ['/logo.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scanned by Nexlink Solutions',
    description: 'Your contact card, one tap away',
    images: ['/logo.svg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
