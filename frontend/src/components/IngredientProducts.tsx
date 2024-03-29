import React, { useEffect, useState } from "react";
import { searchByIngredientApi } from "../services/api/SearchApi";
import { ProductType } from "../types/ProductTypes";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";

export const IngredientProducts: React.FC<{ val?: string }> = ({ val }) => {
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState<ProductType[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await searchByIngredientApi(val!);
        setSearchProduct(response.data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (val) {
      fetchProducts();
    }
  }, [val]);

  return (
    <div className="overflow-x-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <p className="text-black font-bold my-5 sm:my-8">
            Products with Ingredient :{" "}
            <span className="font-normal">{val}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-56 pt-2 pb-4">
            {searchProduct &&
              searchProduct.slice(0, 5).map((product) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="bg-[#E1CEC3] rounded-lg shadow-md p-4 lg:w-52 hover:bg-gray-200 transition duration-300 cursor-pointer">
                  <img
                    src={product.product_img}
                    alt={product.product_name}
                    className="h-40 sm:h-32 lg:h-24 w-full object-contain mb-4 rounded-md"
                  />
                  <h2 className="text-lg font-semibold mb-2">
                    {product.product_name}
                  </h2>
                  <p className="text-gray-600">{product.brand_name}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
