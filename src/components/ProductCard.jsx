import React from 'react';
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart();

  // 1. Set a default stock of 3 if not provided by DB
  const currentStock = product.stock ?? 3;

  // 2. Find the item in the cart to get its current quantity
  const cartItem = cart.find((item) => item._id === product._id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // 3. Logic checks
  const isSoldOut = currentStock <= 0;
  const isAtMaxStock = quantityInCart >= currentStock;

  return (
    <div className={`group flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-all hover:shadow-md ${isSoldOut ? 'opacity-70' : ''}`}>
      
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-300 ${!isSoldOut && 'group-hover:scale-105'}`}
        />
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-[2px]">
            <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            ${product.price}
          </span>
          
          {/* Amazon-style Toggle Button */}
          <div className="flex items-center">
            {quantityInCart === 0 ? (
              <button
                disabled={isSoldOut}
                onClick={() => addToCart(product)}
                className={`rounded-lg px-3 py-2 text-xs font-bold text-white transition-all active:scale-95 
                  ${isSoldOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 dark:bg-blue-600 hover:bg-blue-700'}`}
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1 border border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => removeFromCart(product._id)}
                  className="w-8 h-8 flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
                >
                  −
                </button>
                
                <span className="text-sm font-bold dark:text-white w-4 text-center">
                  {quantityInCart}
                </span>

                <button 
                  disabled={isAtMaxStock}
                  onClick={() => addToCart(product)}
                  className={`w-8 h-8 flex items-center justify-center text-lg font-bold transition-colors
                    ${isAtMaxStock ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'}`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;