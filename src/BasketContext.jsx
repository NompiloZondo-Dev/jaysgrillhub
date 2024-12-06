import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the basket
const BasketContext = createContext();

// Provider to wrap around your app
export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  
  // Initialize the order number from localStorage, or set it to 1 if not set
  const [orderNumber, setOrderNumber] = useState(() => {
    const savedOrderNumber = localStorage.getItem('orderNumber');
    return savedOrderNumber ? parseInt(savedOrderNumber, 10) : 1;
  });

  useEffect(() => {
    // Save the order number to localStorage whenever it changes
    localStorage.setItem('orderNumber', orderNumber);
  }, [orderNumber]);

  const addToBasket = (meal) => {
    setBasket((prevBasket) => [...prevBasket, meal]);
  };

  const getTotalPrice = () => {
    return basket.reduce((total, meal) => total + meal.price, 0);
  };

  const generateOrderNumber = () => {
    const currentOrder = orderNumber;
    setOrderNumber(orderNumber + 1); // Increment the order number for the next order
    return currentOrder; // Return the current order number before incrementing
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket, getTotalPrice, generateOrderNumber }}>
      {children}
    </BasketContext.Provider>
  );
};

// Custom hook to access the basket context
export const useBasket = () => useContext(BasketContext);
