import { createElement } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import amexLogo from "payment-icons/min/flat/amex.svg";
import mastercardLogo from "payment-icons/min/flat/mastercard.svg";
import visaLogo from "payment-icons/min/flat/visa.svg";

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF, url: "https://www.facebook.com" },
  { label: "X", icon: FaXTwitter, url: "https://www.x.com" },
  { label: "Instagram", icon: FaInstagram, url: "https://www.instagram.com" },
  { label: "Email", icon: FaEnvelope, url: "mailto:support@ecomstore.com" },
];

const paymentMethods = [
  { label: "Visa", logo: visaLogo },
  { label: "Mastercard", logo: mastercardLogo },
  { label: "American Express", logo: amexLogo },
];

const MeezaLogo = () => (
  <span className="relative flex h-9 w-16 items-center justify-center overflow-hidden rounded bg-white">
    <span className="absolute left-1.5 top-1 h-1.5 w-8 rounded-sm bg-[#c51d30]" />
    <span className="absolute right-1.5 top-1 h-1.5 w-5 rounded-sm bg-[#ffcc33]" />
    <span className="text-[15px] font-black italic leading-none text-[#30236f]">
      meeza
    </span>
  </span>
);

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
              {socialLinks.map(({ label, icon, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  {createElement(icon, { size: 20, "aria-hidden": true })}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="my-8 rounded-lg bg-[#001a4d] p-6">
          <h4 className="mb-4 text-center text-sm font-semibold text-white">
            We accept
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div
              className="flex h-11 w-20 items-center justify-center rounded bg-white shadow-sm"
              aria-label="Meeza"
              role="img"
            >
              <MeezaLogo />
            </div>
            {paymentMethods.map(({ label, logo }) => (
              <div
                key={label}
                className="flex h-11 w-20 items-center justify-center rounded bg-white px-2 shadow-sm"
                aria-label={label}
                role="img"
              >
                <img
                  src={logo}
                  alt=""
                  className="max-h-8 max-w-16 object-contain"
                />
              </div>
            ))}
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
