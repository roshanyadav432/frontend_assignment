import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "./cartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
function Details() {
  //extracting quantuty from url:
  const context = useContext(CartContext);
  const { addToCart } = context;
  const { id } = useParams();
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductById(id);
  }, [id]);

  //function to fetch data using id:
  async function getProductById(id) {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleAddtoCart(data, quantity) {
    try {
      addToCart(data, quantity);
      toast.success(
        <>
          <span>Item added to cart successfully.... </span>
          <Link to="/cart" className="text-blue-500 underline">
            Go to Cart
          </Link>
        </>
      );
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div>
      <ToastContainer position="top-center" />
      <Header />
      {data ? (
        <div className="details border-2 border-gray-500 flex flex-wrap items-center font-sans justify-center  pl-4 pr-4 ">
          <div className="image p-4 w-[30%] min-w-[200px]">
            <img src={data.image} alt="image" style={{ width: "100%" }} />
          </div>
          <div className="about border-l-4 border-r-4 border-gray-500 w-[50%] min-w-[300px] p-4">
            <p>
              <b>Title</b>:{data.title}
            </p>
            <p className="text-gray-700">
              Description:
              <b> </b> {data.description}
            </p>
            <b> Category:</b>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {data.category}
            </span>
            <b> Price:</b>
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {data.price}
            </span>

            {/* quantity */}
            <div>
              <b> Quantity</b>
              <>
                {/* select quantity : */}
                {/* decrement button */}
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none m-1"
                  onClick={() => {
                    setQuantity((quantity) => {
                      return quantity == 1 ? 1 : quantity - 1;
                    });
                  }}
                >
                  -
                </button>
                <button className="px-4 py-2 bg-white text-black rounded-lg border-2">
                  {quantity}
                </button>
                {/* increment button */}
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none m-1"
                  onClick={() => {
                    setQuantity((quantity) => {
                      return quantity + 1;
                    });
                  }}
                >
                  +
                </button>
              </>
            </div>
            {/* add to cart button */}
          </div>
          <div className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 focus:outline-none m-1">
            <button
              onClick={() => {
                handleAddtoCart(data, quantity);
              }}
            >
              add to cart
            </button>
          </div>
        </div>
      ) : (
        <h1>loading..</h1>
      )}
      <div>{error && <>{error}</>}</div>
    </div>
  );
}

export default Details;
// className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
