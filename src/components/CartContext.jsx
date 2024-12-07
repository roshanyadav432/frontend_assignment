/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
//creating Cartcontext:
const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartData, setCartData] = useState([]);

  //function add to cart
  const addToCart = (product, quantity) => {
    //check whether product is in already in cart:
    const existingProductIndex = cartData.findIndex((item) => {
      return item.id == product.id;
    });

    //if not in the cart
    if (existingProductIndex == -1) {
      setCartData((prev) => {
        return [...prev, { ...product, quantity: quantity }];
      });
    } else {
      //if in the cart
      const updatedCart = [...cartData];
      updatedCart[existingProductIndex].quantity += quantity;
      setCartData(updatedCart);
    }
  };

  //function remove from cart:
  const removeFromCart = (id) => {
    console.log(id, "yahi id aa rahi hai");

    const newArray = cartData.filter((item) => {
      console.log(item.id, "item ke id's");
      return item.id !== id;
    });
    console.log("hey i am remove function newarray", newArray);

    setCartData(newArray);
  };

  const updateQuantity = (id, newQuantity) => {
    const newArray = cartData.map((item) => {
      if (item.id == id) {
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });
    // console.log(newArray, "updated cart");
    setCartData(newArray);
  };

  return (
    <CartContext.Provider
      value={{ cartData, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
export { CartContext };
