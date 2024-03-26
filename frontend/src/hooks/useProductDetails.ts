import { useState, useEffect } from "react";
import axios from "axios";
import { ProductType } from "../types/ProductTypes";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useProduct = (product_id: number) => {
  const [productDetails, setProductDetails] = useState<ProductType | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/search/${product_id}`);
      setProductDetails(response.data.singleProduct);
    } catch (error) {
      console.error(error);
    }
  };

   return { productDetails, setProductDetails };
};