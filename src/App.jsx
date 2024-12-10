import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import CartContextProvider from "./components/CartContext";
import Cart from "./components/Cart";
import Home from "./components/Home";

function App() {
  return (
    <CartContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h1>no page found!!</h1>} />
      </Routes>
    </CartContextProvider>
  );
}

export default App;
