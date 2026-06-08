import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { API } from "../lib/api";

const Cart = () => {
  const [loading, setLoading] = React.useState(false);
  const { cart, cartCount, addToCart, removeFromCart, deleteFromCart } =
    useCart();

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const checkoutItems = cart.map((item) => ({
        id: item._id ?? item.id,
        quantity: item.quantity,
      }));

      const response = await fetch(`${API}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: checkoutItems }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", response.status, errorData);
        alert("Checkout failed: " + (errorData.message || "Unknown error"));
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL received from server");
        setLoading(false);
      }
    } catch (err) {
      console.error("Network/Code Error:", err);
      setLoading(false);
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0,
  );
  const estimatedTax = subtotal * 0.08;
  const totalPrice = subtotal + estimatedTax;

  if (cartCount === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 rounded-full bg-[#e2dfff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#1a146b]">
          Your Bag
        </span>
        <h1 className="brand-heading text-4xl font-bold text-[#1a146b]">
          Your cart is empty.
        </h1>
        <p className="mt-3 max-w-md text-[#474651]">
          Build your selection from the premium utility collection.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-lg bg-[#1a146b] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#312e81]"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <div className="mb-10">
        <h1 className="brand-heading text-5xl font-bold text-[#1a146b]">
          Your Bag
        </h1>
        <p className="mt-2 text-lg text-[#474651]">
          Review and manage the exquisite items in your selection.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        <section className="space-y-6 lg:col-span-8">
          {cart.map((item) => {
            const itemId = item._id ?? item.id;

            return (
              <article
                key={itemId}
                className="ambient-card flex flex-col gap-6 rounded-2xl border border-[#f0ecf4] bg-white p-5 transition-all sm:flex-row"
              >
                <div className="h-44 w-full overflow-hidden rounded-xl bg-[#f0ecf4] sm:w-44">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="brand-heading text-2xl font-semibold text-[#1b1b21]">
                        {item.name}
                      </h2>
                      <p className="mt-2 text-[#474651]">
                        Premium Utility / Quantity {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteFromCart(itemId)}
                      className="rounded-full cursor-pointer px-3 py-2 text-sm font-bold text-[#ba1a1a] transition hover:bg-[#ffdad6]/40"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 rounded-full border border-[#c8c5d3] bg-[#f6f2fa] px-4 py-2">
                      <button
                        onClick={() => removeFromCart(itemId)}
                        className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-full text-xl font-bold text-[#474651] transition hover:bg-white hover:text-[#ba1a1a]"
                        aria-label={`Remove one ${item.name}`}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-[#1b1b21]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-full text-xl font-bold text-[#474651] transition hover:bg-white hover:text-[#1a146b]"
                        aria-label={`Add one ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <span className="brand-heading text-2xl font-semibold text-[#006b5f]">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

          <Link
            to="/"
            className="inline-flex font-semibold text-[#006b5f] transition hover:-translate-x-1"
          >
            Back to shopping
          </Link>
        </section>

        <aside className="lg:sticky lg:top-28 lg:col-span-4">
          <div className="rounded-2xl border border-[#c8c5d3] bg-[#eae7ef] p-8 shadow-md">
            <h2 className="brand-heading text-2xl font-semibold text-[#1b1b21]">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-[#474651]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium text-[#006f64]">Next step</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-[#c8c5d3]" />
              <div className="brand-heading flex justify-between text-2xl font-semibold text-[#1a146b]">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleStripeCheckout}
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-[#1a146b] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#312e81] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : (
                "Pay with Stripe"
              )}
            </button>

            <p className="mt-4 text-sm text-[#777682]">
              Secure checkout powered by your existing Stripe endpoint.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
