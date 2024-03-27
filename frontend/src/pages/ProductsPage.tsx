import React, { useState, useEffect } from "react";
import { RandomProductsApi } from "../services/api/RandomProductsApi";
import { TileView } from "../components/ProductsTileView";
import { ProductType } from "../types/ProductTypes";
import { Product } from "../components/Product";
import { Loading } from "../components/Loading";

export const ProductsPage: React.FC = () => {
  const [showModal, setShowModal] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate a delay of 1 second before fetching products
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await RandomProductsApi();
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 mx-2 md:mx-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="mt-2 px-2 lg:pl-20 w-full sm:w-1/2 md:w-1/3 transition-opacity duration-500 ease-in-out opacity-100">
              <TileView
                product_id={product._id}
                setShowModal={setShowModal}
                {...product}
              />
            </div>
          ))}
          {showModal !== null && (
            <Product
              visible={true}
              setShowModal={setShowModal}
              product_id={showModal}
            />
          )}
        </div>
      )}
    </div>
  );
};
