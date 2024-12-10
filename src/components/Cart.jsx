import { useContext } from "react";
import { CartContext } from "./CartContext";
import Header from "./Header";
function Cart() {
  const context = useContext(CartContext);
  //destructuring context data:
  const { cartData, removeFromCart, updateQuantity } = context;

  let grandTotal = 0;
  cartData.map((item) => {
    grandTotal += item.quantity * item.price;
  });
  console.log("grandTotal", grandTotal);

  //function to handle quantity:
  function handleQuantity(id, quantity, action) {
    if (action == "decrement") {
      //handling quantity, the quantity must be 1:
      quantity !== 1 && updateQuantity(id, quantity - 1);
    } else {
      updateQuantity(id, quantity + 1);
    }
  }

  return (
    <>
      <Header />

      {cartData.length > 0 ? (
        <div className="cart flex flex-wrap gap-10">
          <div className="cartData w-full lg:w-1/2 lg:h-[91vh] ">
            {cartData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center justify-between border-2 border-gray-300 m-2"
                >
                  <img
                    src={item.image}
                    alt="image"
                    style={{ width: "150px" }}
                  />
                  {/* update quantity */}
                  <h3>
                    quantity:
                    <>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none m-1"
                        onClick={() => {
                          handleQuantity(item.id, item.quantity, "decrement");
                        }}
                      >
                        -
                      </button>
                      <button>{item.quantity}</button>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none m-1"
                        onClick={() => {
                          handleQuantity(item.id, item.quantity, "increment");
                        }}
                      >
                        +
                      </button>
                    </>
                  </h3>
                  <p>price: {item.price}</p>

                  <p>Total price: {item.quantity * item.price}</p>
                  {/* remove button */}
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none m-1"
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    remove
                  </button>
                </div>
              );
            })}

            {/* grand total */}
          </div>
          {/* grand Total */}
          <div className="grandTotal sticky top-0 h-max">
            <div className="label flex flex-wrap items-center justify-between">
              <b>Name</b>
              <b>quantity</b>
              <b>price</b>
            </div>
            <div className="labelData">
              {cartData.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between border-b-2 border-gray-500"
                  >
                    <p className="w-[33%]">{item.title}</p>
                    <p>{item.quantity}</p>
                    <p>{item.price}</p>
                  </div>
                );
              })}
            </div>
            <h1>Grand Total: {grandTotal}</h1>
          </div>
        </div>
      ) : (
        <>
          <h1>your cart is empty....</h1>
        </>
      )}
    </>
  );
}

export default Cart;

// Math.ceil(grandTotal)
