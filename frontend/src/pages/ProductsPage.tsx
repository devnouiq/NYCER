import React, { useState, useEffect } from "react";
import { RandomProductsApi } from "../services/api/RandomProductsApi";
import { ProductType } from "../types/ProductTypes";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await RandomProductsApi(page);
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-8">
          <div className="grid grid-cols-1 col-span-7 sm:grid-cols-2 md:grid-cols-4 gap-4 my-10 mx-11 md:ml-24">
            {products &&
              products.map((product) => (
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
          {!loading && (
            <div className="flex items-center justify-center">
              <button
                onClick={handleNextPage}
                className="bg-[#AF7153] text-white px-2 py-2 rounded-full">
                <ArrowRightIcon />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
