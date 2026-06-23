import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../lib/api";
import { useCart } from "../context/CartContext";
import { ChevronLeft, Star, Truck, Shield, RotateCcw } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_API_URL}/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-[#1a146b] hover:text-[#006b5f] transition"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square rounded-2xl bg-gray-200 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-[#1a146b] hover:text-[#006b5f] transition"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-900/20">
          <p className="text-lg font-semibold text-red-800 dark:text-red-300">
            {error || "Product not found"}
          </p>
        </div>
      </main>
    );
  }

  const currentStock = product.stock ?? 3;
  const isSoldOut = currentStock <= 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-[#1a146b] hover:text-[#006b5f] transition font-semibold"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="flex items-start justify-start">
          <div
            className={`relative w-80 h-80 aspect-square rounded-2xl bg-[#f0ecf4] overflow-hidden ${
              isSoldOut ? "opacity-70" : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {isSoldOut && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1a146b]/45 backdrop-blur-[2px]">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-[#1b1b21] shadow-xl">
                  Sold Out
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#777682]">
              Premium Utility
            </p>
            <h1 className="brand-heading text-4xl font-bold text-[#1b1b21] mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-[#777682]">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <span className="brand-heading text-4xl font-bold text-[#1a146b]">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="ml-4 text-lg text-[#777682] line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-semibold text-[#1b1b21] mb-3">Description</h3>
            <p className="text-[#474651] leading-relaxed">
              {product.description ||
                "Premium quality product designed for excellence and durability. Perfect for your everyday needs."}
            </p>
          </div>

          {/* Stock Status */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#1b1b21] mb-2">
              Stock Available:
            </p>
            <p
              className={`text-lg font-bold ${
                currentStock > 5 ? "text-green-600" : "text-orange-600"
              }`}
            >
              {isSoldOut ? "Out of Stock" : `${currentStock} items`}
            </p>
          </div>

          {/* Add to Cart */}
          {!isSoldOut && (
            <div className="mb-8 flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-[#c8c5d3] bg-[#f6f2fa] px-4 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 flex items-center justify-center rounded-full text-lg font-bold text-[#474651] hover:bg-white hover:text-[#ba1a1a] transition"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-bold text-[#1b1b21]">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(currentStock, quantity + 1))
                  }
                  disabled={quantity >= currentStock}
                  className={`h-8 w-8 flex items-center justify-center rounded-full text-lg font-bold transition ${
                    quantity >= currentStock
                      ? "cursor-not-allowed text-[#c8c5d3]"
                      : "cursor-pointer text-[#474651] hover:bg-white hover:text-[#1a146b]"
                  }`}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-lg bg-[#1a146b] px-6 py-3 text-white font-bold hover:bg-[#13104f] transition active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          )}

          {isSoldOut && (
            <button
              disabled
              className="w-full rounded-lg bg-[#777682] px-6 py-3 text-white font-bold cursor-not-allowed mb-8"
            >
              Out of Stock
            </button>
          )}

          {/* Features */}
          <div className="space-y-4 border-t border-gray-200 pt-8">
            <div className="flex gap-4">
              <Truck size={24} className="text-[#006b5f] shrink-0" />
              <div>
                <h4 className="font-semibold text-[#1b1b21]">Free Shipping</h4>
                <p className="text-sm text-[#474651]">On orders over $50</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield size={24} className="text-[#006b5f] shrink-0" />
              <div>
                <h4 className="font-semibold text-[#1b1b21]">
                  Secure Checkout
                </h4>
                <p className="text-sm text-[#474651]">
                  Your payment is safe and secure
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <RotateCcw size={24} className="text-[#006b5f] shrink-0" />
              <div>
                <h4 className="font-semibold text-[#1b1b21]">30-Day Returns</h4>
                <p className="text-sm text-[#474651]">
                  Not satisfied? Easy returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
