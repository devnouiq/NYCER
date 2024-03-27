import axios from "axios";
import { IngredientsType } from "../../types/ProductTypes";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getIngredientDetails = async (ingredient_id: number): Promise<IngredientsType | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/ingredients/${ingredient_id}`);
    return response.data.ingredient;
  } catch (error) {
    console.error(error);
    return null;
  }
};