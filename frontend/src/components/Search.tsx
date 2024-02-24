import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { ProductType } from "../types/productType";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SearchField = () => {
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
          placeholder="*solutions to skincare problems"
          className="rounded-full border-secondary-border border-4 border-solid w-[390px] py-4 px-6 bg-transparent text-white placeholder-white placeholder-opacity-100 font-bold pl-12 focus:border-white outline-none"
          onChange={(e) => {
            setVal(e.target.value);
          }}
        />
        <button className="text-white absolute right-0 top-0 bottom-0 m-auto px-4">
          <Mic />
        </button>
      </div>

      {searchProduct && (
        <div className="mt-4 font-bold text-white">
          <h3>Search Results:</h3>
          {searchProduct.map((product: ProductType, index) => (
            <div key={index} className="mt-2">
              <p>Brand Name: {product.brand_name}</p>
              <p>Product Name: {product.product_name}</p>
              <p>Product Type: {product.product_type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
