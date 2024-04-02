import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export  const  RandomProductsApi = async (page: number) => {
   const response = await axios.get(`${BASE_URL}/products?page=${page}&limit=8`);
   return response.data.randomProducts;
};
