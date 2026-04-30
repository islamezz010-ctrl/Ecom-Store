import { useCart } from "../context/CartContext";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import Login from "../pages/Login";
const Navbar = () => {

  const { cartCount } = useCart();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-mist-400  border-b border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link to="/">
          <span className="self-start text-2xl font-bold bg-blue-600 text-white px-2 py-1 rounded">
            E
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 hidden md:block">
            E-SHOP
          </h1>
          </Link>
        </div>
        {/* Search Bar - Mockup */}
        <div className="flex-1 max-w-md mx-8 hidden sm:block">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none dark:text-gray-50 dark:placeholder-gray-400"
          />
        </div>
        {/* Icons Section */}
        <div className="flex items-center gap-6">
            {location.pathname !== "/login" && (
          <Link
            to="/login"
            className="text-blue-800 text-xl dark:text-gray-50 font-bold tracking-wide hover:text-blue-700 
            hover:underline hover:scale-105 transition duration-200
            dark:hover:text-blue-400 "
          >
            Sign In
          </Link>)}

          <div className="relative cursor-pointer hover:scale-105 transition duration-200">
            <Link to="/cart" className="relative cursor-pointer group">
              <span className="text-2xl">🛒</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-all duration-300 scale-110">
                {cartCount}
              </span>
            </Link>
          </div>

            <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
