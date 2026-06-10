import { createElement } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  CreditCard,
  Gift,
  Headphones,
  HelpCircle,
  Home,
  List,
  MessageSquare,
  Package,
  Shield,
  Smartphone,
  Star,
} from "lucide-react";

const accountCards = [
  {
    title: "Your Orders",
    description: "Track, return, cancel an order, download invoice or buy again",
    icon: Package,
    to: "/orders",
  },
  {
    title: "Login & security",
    description: "Manage password, email, mobile number, and security settings",
    icon: Shield,
    to: "#",
  },
  {
    title: "Prime",
    description: "Manage your membership, view benefits and payment settings",
    icon: Star,
    to: "#",
  },
  {
    title: "Gift cards",
    description: "View balance or redeem a card",
    icon: Gift,
    to: "#",
  },
  {
    title: "Your Payments",
    description: "Manage or add payment methods and view transactions",
    icon: CreditCard,
    to: "#",
  },
  {
    title: "Pre-Order Questions",
    description: "Learn more about refund, cash on delivery and warranty",
    icon: HelpCircle,
    to: "#",
  },
  {
    title: "Your Messages",
    description: "View or respond to messages from sellers and support",
    icon: MessageSquare,
    to: "#",
  },
  {
    title: "Your Addresses",
    description: "Edit, remove or set default address",
    icon: Home,
    to: "#",
  },
  {
    title: "Installment plan",
    description: "View installment plans offered",
    icon: Calendar,
    to: "#",
  },
  {
    title: "LUXE Mobile App",
    description: "Download the mobile app",
    icon: Smartphone,
    to: "#",
  },
  {
    title: "Your Lists",
    description: "View, modify and share your lists or create new ones",
    icon: List,
    to: "#",
  },
  {
    title: "Contact Us",
    description: "Browse self service options, help articles or contact us",
    icon: Headphones,
    to: "#",
  },
];

const Account = () => {
  return (
    <main className="bg-white py-10 sm:py-12">
      <section className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <h1 className="mb-5 text-2xl font-bold leading-tight text-[#111827]">
          Your Account
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accountCards.map(({ title, description, icon, to }) => (
            <Link
              key={title}
              to={to}
              className="group flex min-h-24 items-center gap-4 rounded border border-[#d5d9d9] bg-white px-5 py-4 text-left transition hover:bg-[#f7fafa] hover:border-[#8a9696] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007185] focus:ring-offset-2"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#b8eef0] text-[#0f5f66] transition group-hover:bg-[#a7e4e7]">
                {createElement(icon, {
                  className: "h-7 w-7",
                  strokeWidth: 2.2,
                })}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-5 text-[#111827]">
                  {title}
                </span>
                <span className="mt-1 block text-xs leading-4 text-[#374151]">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Account;
