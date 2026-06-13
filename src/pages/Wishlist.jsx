import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

const Wishlist = () => {
  // Placeholder state - in a real app, this would come from context/API
  const [wishlistItems, setWishlistItems] = useState([]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  if (wishlistItems.length === 0) {
    return (
      <main className="mx-auto min-h-[70vh] px-4 py-12 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="mb-6 rounded-full bg-[#e2dfff] p-6">
            <Heart size={48} className="text-[#1a146b]" />
          </div>
          <span className="mb-4 rounded-full bg-[#e2dfff] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#1a146b]">
            Wishlist
          </span>
          <h1 className="brand-heading text-4xl font-bold text-[#1a146b] mb-4">
            Your wishlist is empty.
          </h1>
          <p className="text-lg text-[#474651] mb-8">
            Save your favorite items to your wishlist and come back to them
            later. Start adding items you love!
          </p>
          <Link
            to="/"
            className="inline-flex rounded-lg px-8 py-4 text-sm font-bold text-white transition hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #1a146b 0%, #312e81 100%)",
            }}
          >
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
      <div className="mb-10">
        <h1 className="brand-heading text-5xl font-bold text-[#1a146b] flex items-center gap-3">
          <Heart className="text-[#ba1a1a]" size={40} />
          Your Wishlist
        </h1>
        <p className="mt-2 text-lg text-[#474651]">
          {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""}{" "}
          saved
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlistItems.map((item) => (
          <article
            key={item.id}
            className="ambient-card group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300"
          >
            <div className="relative aspect-square overflow-hidden bg-[#f0ecf4]">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md hover:bg-[#ffdad6] transition"
                aria-label="Remove from wishlist"
              >
                <Heart size={20} className="fill-[#ba1a1a] text-[#ba1a1a]" />
              </button>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#777682]">
                Premium Utility
              </p>
              <h3 className="brand-heading line-clamp-2 text-xl font-semibold leading-snug text-[#1b1b21]">
                {item.name}
              </h3>

              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="brand-heading text-2xl font-semibold text-[#1a146b]">
                  ${Number(item.price).toFixed(2)}
                </span>

                <button className="rounded-lg bg-[#1a146b] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#13104f] active:scale-95 flex items-center gap-2">
                  <ShoppingCart size={16} />
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
