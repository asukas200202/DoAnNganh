import React, { createContext, useEffect, useState } from 'react';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    
  }, [cart])

  useEffect(() => {
    var cartLocal = JSON.parse(localStorage.getItem("cart"));
    if(!cartLocal)
      setCart([])
    else 
      setCart(cartLocal)
  }, [])

  const addToCart = (product) => {
    const foundProduct = cart.find(p => p._id === product._id);
    if(foundProduct) {
      alert("Sản phẩm đã có trong giỏ hàng rồi ")
    }
    else {
      setCart((prevItems) => [...prevItems, product]);
      var cartLocal = cart;
      cartLocal.push(product)
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevItems) => prevItems.filter(item => item._id !== productId));
    var cartLocal = cart.filter(p => p._id !== productId);
    localStorage.setItem("cart", JSON.stringify(cartLocal))
  };

  const deleteCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  }

  return (
    <DataContext.Provider value={{ cart, addToCart, removeFromCart, deleteCart }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };