
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCartItems,createCart } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try {
      const res = await getCartItems();
      setCartItems(res);
    } catch (err) {
      console.error('Failed to fetch cart items', err);
    }
  };

  const addToCart = async (product_id, quantity, discount_price) => {
    try {
      await createCart(product_id, quantity, discount_price);
      await fetchCartItems();
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
