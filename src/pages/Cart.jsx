import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const [loading, setLoading] = React.useState(false);
  const { cart, cartCount } = useCart();



/////////////////////////////////////////////////////

        const handleStripeCheckout = async () => {
       setLoading(true);
      try {

        const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: cart }),
        },
      );

        const data = await response.json();

      if (data.url) {
        // This is the modern 2026 way: Just redirect to the session URL
        window.location.href = data.url;
       } else {
        console.error("No checkout URL received from server");
       }
        } 
        
      catch (err) {
      console.error("Network/Code Error:", err);
      setLoading(false);
    }
  };

  /////////////////////////////////////////////////////////////////////

  // Calculate Total
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-600 text-center">
          Your cart is empty... for now.
        </h2>
        <Link
          to="/"
          className="mt-4 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          Go back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-black mb-8 dark:text-gray-50">Your Bag</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ${item.price} x {item.quantity}
              </p>
            </div>
            <p className="font-black text-blue-600 dark:text-blue-400">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-gray-900 dark:bg-gray-800 text-white rounded-2xl flex justify-between items-center shadow-xl">
        <div>
          <p className="text-gray-400 text-sm">Total Amount</p>
          <p className="text-3xl font-black">${totalPrice.toFixed(2)}</p>
        </div>
        <button className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors">
          Checkout Now
        </button>

        <button
          onClick={handleStripeCheckout}
          disabled={loading}
          className="z-50 relative bg-blue-600 px-8 py-3 rounded-xl font-bold text-white cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            "Pay with Stripe"
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
