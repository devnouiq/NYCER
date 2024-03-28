import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export const searchApi = (keyword: string) => {
  return axios.get(`${BASE_URL}/search`, {
    params: {
      keyword: keyword,
    },
  });
};


export const searchByIngredientApi = (keyword: string) => {
  return axios.get(`${BASE_URL}/searchbyingredient`, {
    params: {
      keyword: keyword,
    },
  });
};
