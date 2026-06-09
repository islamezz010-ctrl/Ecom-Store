import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const productId = product._id ?? product.id;
  const currentStock = product.stock ?? 3;
  const cartItem = cart.find((item) => (item._id ?? item.id) === productId);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isSoldOut = currentStock <= 0;
  const isAtMaxStock = quantityInCart >= currentStock;

  return (
    <article
      className={`ambient-card group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 ${
        isSoldOut ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-[#f0ecf4]">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            !isSoldOut ? "group-hover:scale-110" : ""
          }`}
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#006b5f] shadow-sm">
          New
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a146b]/45 backdrop-blur-[2px]">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-[#1b1b21] shadow-xl">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#777682]">
          Premium Utility
        </p>
        <h3 className="brand-heading line-clamp-2 text-xl font-semibold leading-snug text-[#1b1b21]">
          {product.name}
        </h3>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="brand-heading text-2xl font-semibold text-[#1a146b]">
            ${Number(product.price).toFixed(2)}
          </span>

          {quantityInCart === 0 ? (
            <button
              disabled={isSoldOut}
              onClick={() => addToCart(product)}
              className={`rounded-lg px-3 py-2 text-xs font-bold text-white transition-all active:scale-95 ${
                isSoldOut
                  ? "cursor-not-allowed bg-[#777682]"
                  : "cursor-pointer bg-[#1a146b] hover:bg-[#13104f]"
              }`}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-[#c8c5d3] bg-[#f6f2fa] px-2 py-1">
              <button
                onClick={() => removeFromCart(productId)}
                className="flex cursor-pointer h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-[#474651] transition hover:bg-white hover:text-[#ba1a1a]"
                aria-label={`Remove one ${product.name}`}
              >
                -
              </button>
              <span className="w-6 text-center text-sm font-bold text-[#1b1b21]">
                {quantityInCart}
              </span>
              <button
                disabled={isAtMaxStock}
                onClick={() => addToCart(product)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold transition ${
                  isAtMaxStock
                    ? "cursor-not-allowed text-[#c8c5d3]"
                    : "cursor-pointer text-[#474651] hover:bg-white hover:text-[#1a146b]"
                }`}
                aria-label={`Add one ${product.name}`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
