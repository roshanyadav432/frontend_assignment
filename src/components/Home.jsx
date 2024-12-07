import Header from "./Header";
import Category from "./Category";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import ProductList from "./ProductList";

function Home() {
  return (
    <div>
      <Header />
      <div className="flex justify-between p-4 border-b-2">
        <Category />
        <SearchBar />
        <Sort />
      </div>

      <div>
        <ProductList />
      </div>
    </div>
  );
}

export default Home;
