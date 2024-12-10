import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const urlSearchParams = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(urlSearchParams);
  const search = searchParams.get("search");

  return (
    <div className="  w-1/3">
      <input
        className="w-full outline-none block text-lg font-medium text-gray-700 mb-2 border-2 border-gray-500  h-[40px] rounded"
        type="text"
        value={search}
        placeholder="search products"
        onChange={(e) => {
          if (e.target.value) {
            searchParams.set("search", e.target.value);
            setSearchParams(searchParams);
          } else {
            searchParams.delete("search");
            setSearchParams(searchParams);
          }
        }}
      />
    </div>
  );
}

export default SearchBar;
