import Link from 'next/link';
import '@/styles/globals.css';

// Font Awesome setup import (important)
import '@/lib/fontawesome';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export const metadata = {
  title: 'Sunglass Store',
  description: 'Shop stylish sunglasses',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground font-sans">
        <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-10">
          <Link href="/" className="text-2xl font-bold">
            🕶️ Sunglass Store
          </Link>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
          </ul>
        </nav>

        <main className="flex-grow">{children}</main>

        <footer className="bg-gray-100 text-gray-700 py-6 mt-12">
          <div className="container mx-auto flex justify-center space-x-8 items-center">
            {/* Social icons */}
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600"
            >
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>

            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-600"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>

            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="hover:text-blue-400"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>

            {/* Privacy Policy link */}
            <Link
              href="/privacy-policy"
              className="ml-8 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
