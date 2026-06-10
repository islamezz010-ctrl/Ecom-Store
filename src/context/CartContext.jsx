import { createContext, useState, useContext, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getProductId = (product) => product._id ?? product.id;

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const addToCart = useCallback((product) => {
    const productId = getProductId(product);

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => getProductId(item) === productId);

      if (existingItem) {
        return prevCart.map((item) =>
          getProductId(item) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          getProductId(item) === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const deleteFromCart = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => getProductId(item) !== productId),
    );
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
