import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import ShowShortDesc from "./ShowShortDesc";

const fetchData = async (searchParams) => {
  const { queryKey } = searchParams;
  const [, category] = queryKey;

  //if category is present then select product as category wise else select all product
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products";

  const response = await axios.get(`${url}`);
  return response.data;
};

//function to handle search and sort:
const applySearchAndSort = ({ data, search, sort }) => {
  if (!data) return;
  let filteredData = [...data];
  if (search) {
    filteredData = filteredData?.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  if (sort === "priceAsc") {
    filteredData = filteredData?.sort((a, b) => a.price - b.price);
  }
  if (sort === "priceDesc") {
    filteredData = filteredData?.sort((a, b) => b.price - a.price);
  }
  if (sort === "alphaAsc") {
    filteredData = filteredData?.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  }

  if (sort === "alphaDesc") {
    filteredData = filteredData?.sort((a, b) =>
      b.title.toLowerCase().localeCompare(a.title.toLowerCase())
    );
  }
  return filteredData;
};

function ProductList() {
  const urlSearchParams = new URLSearchParams();
  const [searchParams] = useSearchParams(urlSearchParams);

  //getting data from url:
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", category],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div className="flex justify-center item-center">Loading...</div>;
  }
  if (isError) {
    return (
      <div className="flex justify-center item-center">{error.message}</div>
    );
  }

  //calling applySearchAndSort:
  const filteredData = applySearchAndSort({ search, sort, data });

  return (
    <div className="p-2">
      <div className="w-full justify-start flex flex-wrap gap-y-4">
        {filteredData?.length > 0 ? (
          filteredData.map((item) => {
            return (
              <Link
                to={`/products/${item.id}`}
                className="w-full sm:w-full md:w-1/2 lg:w-1/4 rounded overflow-hidden shadow-lg "
                key={item.id}
              >
                <img
                  className="w-1/2 w-48 h-48 object-cover"
                  src={item.image}
                  alt="Sunset in the mountains"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <ShowShortDesc description={item.description} />
                </div>
                <div className="px-6 pt-4 pb-2 flex justify-between item-center">
                  <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {item.price} rs
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {item.category}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <h1>data not found</h1>
        )}
      </div>
    </div>
  );
}

export default ProductList;
