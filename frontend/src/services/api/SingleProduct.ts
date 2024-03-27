import axios from "axios";
import { ProductType } from "../../types/ProductTypes";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getProductDetails = async (product_id: number): Promise<ProductType | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${product_id}`);
    return response.data.singleProduct;
  } catch (error) {
    console.error(error);
    return null;
  }
};