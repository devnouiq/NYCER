import axios, { AxiosResponse } from 'axios';

interface User {
  username: string;
  keyword: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createUser = async (username: string, keyword: string): Promise<User | undefined> => {
  try {
    const response: AxiosResponse<User> = await axios.post(`${BASE_URL}/usersdata`, {
      username,
      keyword,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    return undefined;
  }
};