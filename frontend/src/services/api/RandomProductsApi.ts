import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export  const  RandomProductsApi = async () => {
   const response = await axios.get(`${BASE_URL}/products`);
   return response.data.randomProducts;
};
