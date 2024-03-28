import React, { useEffect, useState } from "react";
import { getProductDetails } from "../services/api/SingleProduct";
import { ProductType } from "../types/ProductTypes";
import { useParams } from "react-router-dom";

// TODO: use type, add proper fields for other info and integrate it with search field

// TODO: create similar stuff for ingredients

export const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log("productId : ", productId);
      try {
        const fetchedProduct = await getProductDetails(productId!);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {product ? (
            <div>
              <h1>{product.product_name}</h1>
              <img src={product.product_img} alt={product.product_name} />
              <p>{product.brand_name}</p>
              {/* Add other product details as needed */}
            </div>
          ) : (
            <div>Product not found.</div>
          )}
        </>
      )}
    </div>
  );
};
