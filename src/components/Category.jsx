// import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

async function fetchCategory() {
  const response = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  return response.data;
}
function Category() {
  const urlSearchParams = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(urlSearchParams);
  const category = searchParams.get("category");

  const { data, isError, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });
  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>error occured!!</h1>;

  return (
    <div>
      <select
        className="w-full outline-none block text-lg font-medium text-gray-700 mb-2 border-2 border-gray-500  h-[40px] rounded"
        value={category && category}
        name="category"
        id="categoryId"
        onChange={(e) => {
          if (e.target.value) {
            searchParams.set("category", e.target.value);
          } else {
            searchParams.delete("category");
          }
          setSearchParams(searchParams);
        }}
      >
        <option value={""}>all</option>
        {data.map((cat) => {
          return (
            <option value={cat} key={cat} className="border-2 outline-none">
              {cat}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Category;
