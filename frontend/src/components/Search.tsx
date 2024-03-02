import { useState } from "react";
import { Search } from "lucide-react";
import { ProductType } from "../types/productType";
import axios from "axios";
import { TileView } from "./TileView";
import { Product } from "./Product";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SearchField = (props: { placeholder: string }) => {
  const [searchProduct, setSearchProduct] = useState([]);
  const [val, setVal] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState(3);
  const [showModal, setShowModal] = useState<number | null>(null);

  function handleLoadMore() {
    setDisplayedProducts(displayedProducts + 3);
  }

  function handleSearch(val: string) {
    const keyword = val;
    axios
      .get(`${BASE_URL}/user/search`, {
        params: {
          keyword: keyword,
        },
      })
      .then((response) => {
        setSearchProduct(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="bg-transparent">
      <div className="flex flex-grow max-w-[600px] relative mx-auto">
        <button
          onClick={() => handleSearch(val)}
          className="text-white absolute left-0 top-0 bottom-0 m-auto px-4">
          <Search />
        </button>
        <input
          type="search"
          placeholder={props.placeholder}
          className="rounded-full border-secondary-border border-4 border-solid w-full md:w-[390px] py-4 px-6 bg-transparent text-white placeholder-white placeholder-opacity-100 font-bold pl-12 focus:border-white outline-none"
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
      </div>

      {searchProduct.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center mt-4 font-bold text-white">
          {searchProduct
            .slice(0, displayedProducts)
            .map((product: ProductType) => (
              <div
                key={product._id}
                className="mt-2 px-2 w-full sm:w-1/2 md:w-1/3 transition-opacity duration-500 ease-in-out opacity-100">
                <TileView
                  product_id={product._id}
                  setShowModal={setShowModal}
                  {...product}
                />
              </div>
            ))}

          {searchProduct.length > displayedProducts && (
            <div className="w-full text-center mt-4 transition-opacity duration-500 ease-in-out opacity-100">
              <button
                onClick={handleLoadMore}
                className="bg-black text-white p-2 rounded-xl hover:bg-black focus:outline-none focus:ring focus:border-white">
                Load More
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="pt-8 text-center text-2xl text-white font-semibold">
          N Y C E R S E A R C H T O O L
        </div>
      )}
      {showModal !== null && (
        <Product
          visible={true}
          setShowModal={setShowModal}
          product_id={showModal}
        />
      )}
    </div>
  );
};
