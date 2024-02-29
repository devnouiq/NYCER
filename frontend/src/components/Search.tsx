import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { ProductType } from "../types/productType";
import axios from "axios";
import { TileView, ProductView } from "./TileView";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SearchField = (props: { placeholder: string }) => {
  // const productTileView: ProductView = {
  //   product_name: "Hello world",
  //   ingredients: [
  //     {
  //       ingredient_name: "Sample Ingredient 1",
  //       what_it_does: "This is a sample ingredient that does something.",
  //       community_rating: "4.5",
  //       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //     },
  //     {
  //       ingredient_name: "Sample Ingredient 2",
  //       what_it_does: "Another sample ingredient with a different function.",
  //       community_rating: "3.8",
  //       description:
  //         "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  //     },
  //   ],
  //   benefits: [
  //     "Sample Benefit 1: Provides hydration to the skin",
  //     "Sample Benefit 2: Reduces the appearance of wrinkles",
  //   ],
  // };

  const [searchProduct, setSearchProduct] = useState([]);
  const [val, setVal] = useState("");

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
      <div className="flex flex-grow max-w-[600px] relative">
        <button
          onClick={() => handleSearch(val)}
          className="text-white absolute left-0 top-0 bottom-0 m-auto px-4">
          <Search />
        </button>
        <input
          type="search"
          placeholder={props.placeholder}
          className="rounded-full border-secondary-border border-4 border-solid w-[390px] py-4 px-6 bg-transparent text-white placeholder-white placeholder-opacity-100 font-bold pl-12 focus:border-white outline-none left-0 right-0"
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
      </div>

      {searchProduct.length > 0 ? (
        <div className="flex item-center justify-center mt-4 font-bold text-white">
          {searchProduct.map((product: ProductType) => (
            <div key={product._id} className="mt-2 px-2">
              <TileView product_id={""} {...product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-24 text-center text-2xl text-white font-semibold">
          N Y C E R S E A R C H T O O L
        </div>
      )}
    </div>
  );
};
