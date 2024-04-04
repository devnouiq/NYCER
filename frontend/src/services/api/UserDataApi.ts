import axios, { AxiosResponse } from 'axios';

interface KeywordType {
  keyword: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createKeyword = async (keyword: string): Promise<KeywordType | undefined> => {
  try {
    const response: AxiosResponse<KeywordType> = await axios.post(`${BASE_URL}/keywordsdata`, {
      keyword,
    });

    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    return undefined;
  }
};