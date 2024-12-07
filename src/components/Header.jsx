// import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./cartContext";
function Header() {
  const context = useContext(CartContext);
  const { cartData } = context;
  return (
    <div className="w-full flex flex-wrap justify-start items-center gap-10  bg-gray-700 text-white text-xl h-[40px]">
      <Link to={"/"}>Home</Link>
      <Link to={"/cart"}>Cart: {cartData.length}</Link>
    </div>
  );
}

export default Header;
