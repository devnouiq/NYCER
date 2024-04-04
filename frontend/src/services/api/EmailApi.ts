
import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export const postEmail = async (email: string) => {
   const response = axios.post(`${BASE_URL}/emails`, { email });
   return response;
};

