import { Link } from "react-router-dom";
import { Globe, MessageCircle, Image, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#001a4d] bg-[#001a4d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Ecom Store</h3>
            <p className="text-sm text-gray-300">
              Your trusted online marketplace for quality products and
              exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Cart
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Globe size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Image size={20} />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="my-8 rounded-lg bg-[#001a4d] p-6">
          <h4 className="mb-4 text-center text-sm font-semibold text-white">
            We accept
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2">
              <span className="text-xl font-bold text-blue-600">VISA</span>
            </div>
            <div className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2">
              <span className="text-xl font-bold">💳 Mastercard</span>
            </div>
            <div className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2">
              <span className="text-xl font-bold text-orange-500">⚡ Fawry</span>
            </div>
            <div className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2">
              <span className="text-xl font-bold text-blue-500">AMEX</span>
            </div>
            <div className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2">
              <span className="text-xl font-bold text-purple-600">🟣 OKay</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-600"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-300">
            &copy; {currentYear} Ecom Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
