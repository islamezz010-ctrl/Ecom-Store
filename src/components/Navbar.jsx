import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("userInfo");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("auth:changed", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth:changed", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    window.dispatchEvent(new Event("auth:changed"));
  };

  const displayName = user?.name || user?.email || "Account";
  const initials = displayName
    .split(/\s|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e1e9] bg-[#fcf8ff]/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="brand-heading text-3xl font-bold tracking-tight text-[#1a146b]"
          >
            LUXE
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className={`pb-1 text-base font-semibold transition-colors ${
                location.pathname === "/"
                  ? "border-b-2 border-[#1a146b] text-[#1a146b]"
                  : "text-[#474651] hover:text-[#1a146b]"
              }`}
            >
              Shop
            </Link>
            <a
              className="text-base text-[#474651] transition-colors hover:text-[#1a146b]"
              href="#collections"
            >
              Categories
            </a>
            <a
              className="text-base text-[#474651] transition-colors hover:text-[#1a146b]"
              href="#products"
            >
              Deals
            </a>
            <a
              className="text-base text-[#474651] transition-colors hover:text-[#1a146b]"
              href="#products"
            >
              Orders
            </a>
          </div>
        </div>

        <div className="hidden flex-1 justify-center px-8 sm:flex">
          <div className="relative w-full max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#777682]">
              Search
            </span>
            <input
              type="text"
              aria-label="Search products"
              className="w-full rounded-full border border-transparent bg-[#f6f2fa] py-3 pl-20 pr-4 text-sm outline-none transition focus:border-[#312e81] focus:ring-4 focus:ring-[#312e81]/10"
              placeholder="Search products..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={displayName}
                  className="peer h-10 w-10 cursor-pointer rounded-full border-2 border-[#001a4d] object-cover shadow-sm transition-transform hover:scale-105"
                />
              ) : (
                <button className="peer flex cursor-pointer h-10 w-10 items-center justify-center rounded-full border-2 border-[#001a4d] bg-[#e2dfff] text-sm font-bold text-[#1a146b] shadow-sm transition-transform hover:scale-105">
                  {initials || "U"}
                </button>
              )}
              <div className="invisible absolute right-0 z-50 mt-3 w-52 rounded-xl border border-[#e5e1e9] bg-white opacity-0 shadow-xl transition-all peer-hover:visible peer-hover:opacity-100 hover:visible hover:opacity-100">
                <div className="border-b border-[#e5e1e9] px-4 py-3">
                  <p className="text-xs text-[#777682]">Signed in as</p>
                  <p className="truncate text-sm font-bold text-[#1b1b21]">
                    {displayName}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer rounded-b-xl px-4 py-3 text-left text-sm font-semibold text-[#ba1a1a] transition-colors hover:bg-[#ffdad6]/40"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            location.pathname !== "/login" && (
              <Link
                to="/login"
                className="hidden rounded-lg border border-[#312e81] px-4 py-2 text-sm font-bold text-[#312e81] transition hover:bg-[#312e81]/5 sm:inline-flex"
              >
                Sign In
              </Link>
            )
          )}

          <Link
            to="/cart"
            className="relative inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-white bg-[#001a4d] transition hover:bg-[#003366] active:scale-95"
          >
            <div className="relative inline-flex">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ff8c42] text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </div>
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
