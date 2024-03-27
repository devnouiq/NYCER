import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export const RandomIngredients = async () => {
   const response = await axios.get(`${BASE_URL}/ingredients`);
   return response.data.randomIngredients;
};
