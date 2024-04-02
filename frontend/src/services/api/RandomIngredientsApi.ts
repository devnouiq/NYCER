import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export const RandomIngredients = async (page: number) => {
   const response = await axios.get(`${BASE_URL}/ingredients?page=${page}&limit=10`);
   return response.data.ingredients;
};
