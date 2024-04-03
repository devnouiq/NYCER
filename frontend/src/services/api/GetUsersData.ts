
import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export const getUsersData = async () => {
   const response = await axios.get(`${BASE_URL}/allusersdata`);
   return response.data;
};


export const getEmails = async () => {
   const response = await axios.get(`${BASE_URL}/allemails`);
   return response.data;
}