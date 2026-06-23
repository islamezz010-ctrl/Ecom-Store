import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useDeliveryLocation } from "../context/LocationContext";
import { useNotification } from "../hooks/useNotification";
import DeliveryAddressCard from "../components/DeliveryAddressCard";
import AddressFormModal from "../components/AddressFormModal";
import { BASE_API_URL } from "../lib/api";

const Cart = () => {
  const [loading, setLoading] = React.useState(false);
  const [addressModalOpen, setAddressModalOpen] = React.useState(false);
  const notify = useNotification();
  const { cart, cartCount, addToCart, removeFromCart, deleteFromCart } =
    useCart();
  const { location, selectedAddress, calculateShipping } =
    useDeliveryLocation();

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const checkoutItems = cart.map((item) => ({
        id: item._id ?? item.id,
        quantity: item.quantity,
      }));

      const response = await fetch(`${BASE_API_URL}/api/checkout/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: checkoutItems,
          location: {
            id: location.id,
            name: location.name,
            governorate: location.governorate,
          },
          address: selectedAddress
            ? {
                fullName: selectedAddress.fullName,
                mobile: selectedAddress.mobile,
                street: selectedAddress.street,
                building: selectedAddress.building,
                cityArea: selectedAddress.cityArea,
                district: selectedAddress.district,
                governorate: selectedAddress.governorate,
                landmark: selectedAddress.landmark,
                addressType: selectedAddress.addressType,
              }
            : undefined,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", response.status, errorData);
        notify.error(
          "Checkout failed: " + (errorData.message || "Unknown error"),
        );
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
  const shippingCost = calculateShipping(subtotal);
  const estimatedTax = subtotal * 0.08;
  const totalPrice = subtotal + shippingCost + estimatedTax;
  const shippingLabel =
    shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`;

  if (cartCount === 0) {
    return (
      <main className="mx-auto min-h-[70vh] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-12 items-center lg:grid-cols-2">
          {/* Left Side - Message and CTA */}
          <div className="flex flex-col justify-center">
            <span className="mb-4 rounded-full bg-[#e2dfff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#1a146b] w-fit">
              Your Bag
            </span>
            <h1 className="brand-heading text-5xl font-bold text-[#1a146b] mb-4">
              Your cart is empty.
            </h1>
            <p className="text-lg text-[#474651] mb-3 max-w-md leading-relaxed">
              Build your selection from our premium utility collection. Start
              shopping and discover amazing products!
            </p>
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-2 text-[#006b5f] font-semibold">
                <span>✨ Free Shipping on Orders Over $50</span>
              </div>
              <div className="flex items-center gap-2 text-[#006b5f] font-semibold">
                <span>🎁 Premium Quality Products</span>
              </div>
              <div className="flex items-center gap-2 text-[#006b5f] font-semibold">
                <span>⚡ Fast Delivery</span>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex rounded-lg px-8 py-4 text-sm font-bold text-white transition hover:shadow-lg hover:-translate-y-0.5 active:scale-95 w-fit"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1a146b 0%, #312e81 100%)",
              }}
            >
              Continue Shopping
            </Link>
          </div>

          {/* Right Side - Shopping Cart Illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative background shapes */}
              <div
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(26,20,107,0.10) 0%, rgba(0,107,95,0.10) 100%)",
                }}
              ></div>

              <svg
                viewBox="0 0 300 350"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background circle */}
                <circle
                  cx="150"
                  cy="175"
                  r="130"
                  fill="#f0ecf4"
                  opacity="0.4"
                />

                {/* Shopping Cart */}
                {/* Cart Body */}
                <path
                  d="M 60 120 L 75 80 L 230 80 L 240 120 Z"
                  fill="none"
                  stroke="#1a146b"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                {/* Cart Main Container */}
                <path
                  d="M 65 120 L 70 240 Q 70 250 80 250 L 220 250 Q 230 250 230 240 L 235 120"
                  fill="#006b5f"
                  stroke="#1a146b"
                  strokeWidth="3"
                  opacity="0.8"
                />

                {/* Cart Handle */}
                <path
                  d="M 85 80 Q 150 40 215 80"
                  stroke="#1a146b"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Left Wheel */}
                <circle
                  cx="85"
                  cy="255"
                  r="12"
                  fill="none"
                  stroke="#1a146b"
                  strokeWidth="3"
                />
                <circle cx="85" cy="255" r="6" fill="#1a146b" />

                {/* Right Wheel */}
                <circle
                  cx="215"
                  cy="255"
                  r="12"
                  fill="none"
                  stroke="#1a146b"
                  strokeWidth="3"
                />
                <circle cx="215" cy="255" r="6" fill="#1a146b" />

                {/* Product boxes inside cart */}
                {/* Box 1 */}
                <rect
                  x="85"
                  y="135"
                  width="35"
                  height="35"
                  rx="3"
                  fill="#ffd700"
                  opacity="0.9"
                />
                <circle
                  cx="102.5"
                  cy="152.5"
                  r="8"
                  fill="#1a146b"
                  opacity="0.3"
                />

                {/* Box 2 */}
                <rect
                  x="135"
                  y="145"
                  width="35"
                  height="35"
                  rx="3"
                  fill="#ff6b9d"
                  opacity="0.9"
                />
                <circle
                  cx="152.5"
                  cy="162.5"
                  r="8"
                  fill="#1a146b"
                  opacity="0.3"
                />

                {/* Box 3 */}
                <rect
                  x="185"
                  y="135"
                  width="35"
                  height="35"
                  rx="3"
                  fill="#4dabf7"
                  opacity="0.9"
                />
                <circle
                  cx="202.5"
                  cy="152.5"
                  r="8"
                  fill="#1a146b"
                  opacity="0.3"
                />

                {/* Checkmarks on products */}
                <text
                  x="102"
                  y="158"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#1a146b"
                  textAnchor="middle"
                >
                  ✓
                </text>
                <text
                  x="152"
                  y="168"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#1a146b"
                  textAnchor="middle"
                >
                  ✓
                </text>
                <text
                  x="202"
                  y="158"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#1a146b"
                  textAnchor="middle"
                >
                  ✓
                </text>

                {/* Sparkles around cart */}
                <circle cx="40" cy="100" r="4" fill="#1a146b" />
                <circle cx="260" cy="110" r="4" fill="#006b5f" />
                <circle cx="35" cy="180" r="3" fill="#1a146b" opacity="0.6" />
                <circle cx="265" cy="190" r="3" fill="#006b5f" opacity="0.6" />
                <circle cx="50" cy="240" r="2.5" fill="#1a146b" opacity="0.4" />
                <circle
                  cx="250"
                  cy="230"
                  r="2.5"
                  fill="#006b5f"
                  opacity="0.4"
                />

                {/* Decorative plus signs */}
                <g opacity="0.5">
                  <line
                    x1="25"
                    y1="150"
                    x2="35"
                    y2="150"
                    stroke="#1a146b"
                    strokeWidth="2"
                  />
                  <line
                    x1="30"
                    y1="145"
                    x2="30"
                    y2="155"
                    stroke="#1a146b"
                    strokeWidth="2"
                  />
                </g>
                <g opacity="0.5">
                  <line
                    x1="270"
                    y1="160"
                    x2="280"
                    y2="160"
                    stroke="#006b5f"
                    strokeWidth="2"
                  />
                  <line
                    x1="275"
                    y1="155"
                    x2="275"
                    y2="165"
                    stroke="#006b5f"
                    strokeWidth="2"
                  />
                </g>
              </svg>

              {/* Motivational Text */}
              <div className="mt-8 text-center space-y-2">
                <p className="text-lg font-bold text-[#1a146b]">
                  Add items to get started!
                </p>
                <p className="text-sm text-[#474651]">
                  Browse our collection and fill your cart with amazing
                  products.
                </p>
              </div>
            </div>
          </div>
        </div>
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

            <div className="mt-5">
              <DeliveryAddressCard
                onAddAddress={() => setAddressModalOpen(true)}
              />
            </div>

            <div className="mt-6 space-y-4 text-[#474651]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  Shipping to{" "}
                  {selectedAddress ? selectedAddress.cityArea : location.name}
                </span>
                <span className="font-medium text-[#006f64]">
                  {shippingLabel}
                </span>
              </div>
              {shippingCost > 0 && subtotal < location.freeShippingMin && (
                <p className="text-sm text-[#006b5f]">
                  Add ${(location.freeShippingMin - subtotal).toFixed(2)} more
                  for free shipping to {location.name}.
                </p>
              )}
              <p className="text-sm text-[#777682]">
                Estimated delivery: {location.deliveryDays} business days
              </p>
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

      <AddressFormModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
      />
    </main>
  );
};

export default Cart;
