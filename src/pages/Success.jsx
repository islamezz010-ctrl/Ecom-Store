import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Success = () => {
  // 1. We need 'cart' to know what was bought, and 'clearCart' to reset it
  const { cart, clearCart } = useCart();

  useEffect(() => {
    const finalizePurchase = async () => {
      // Only run if there are actually items in the cart
      if (cart.length > 0) {
        try {
          // 2. Tell the backend to reduce the stock for these items
          await fetch("http://localhost:5000/api/products/reduce-stock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart }),
          });

          // 3. ONLY clear the cart after the database has been updated
          clearCart();
        } catch (error) {
          console.error("Failed to update inventory:", error);
        }
      }
    };

    finalizePurchase();
  }, [cart, clearCart]); // Added dependencies for safety

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce">
        ✓
      </div>
      <h1 className="text-5xl font-black text-gray-900 dark:text-gray-50 mb-4">
        Payment Received!
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md">
        Your order has been placed successfully. The items have been removed
        from our live inventory.
      </p>
      <Link
        to="/"
        className="mt-10 bg-gray-900 dark:bg-gray-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-600 transition-all shadow-xl"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
