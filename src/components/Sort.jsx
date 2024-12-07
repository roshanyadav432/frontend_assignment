import { useSearchParams } from "react-router-dom";

function Sort() {
  const urlSearchParams = new URLSearchParams();
  const [searchParams, setSearchParams] = useSearchParams(urlSearchParams);

  const sort = searchParams.get("sort");

  return (
    <div>
      Sort By:
      <div>
        Price:
        <input
          type="radio"
          id="priceAsc"
          value="priceAsc"
          checked={sort === "priceAsc"}
          name="sort"
          onChange={(e) => {
            searchParams.set("sort", e.target.value);
            setSearchParams(searchParams);
          }}
        />
        <label htmlFor="priceAsc">Low to High</label>
        <input
          type="radio"
          id="priceDesc"
          value="priceDesc"
          name="sort"
          checked={sort === "priceDesc"}
          onChange={(e) => {
            searchParams.set("sort", e.target.value);
            setSearchParams(searchParams);
          }}
        />
        <label htmlFor="priceDesc">High to Low </label>
      </div>
      {/* sortByAlphabates */}
      <div className="alphabet">
        <label htmlFor="alphaAsc">Alphabates: </label>
        <input
          type="radio"
          name="sort"
          value={"alphaAsc"}
          id="alphaAsc"
          checked={sort === "alphaAsc"}
          onChange={(e) => {
            searchParams.set("sort", e.target.value);
            setSearchParams(searchParams);
          }}
        />
        A - Z
        <input
          type="radio"
          name="sort"
          value="alphaDesc"
          id="alphaDesc"
          checked={sort === "alphaDesc"}
          onChange={(e) => {
            searchParams.set("sort", e.target.value);
            setSearchParams(searchParams);
          }}
        />
        Z- A
      </div>
    </div>
  );
}

export default Sort;
