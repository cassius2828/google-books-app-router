import axios from "axios";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_VOL_URL = `https://www.googleapis.com/books/v1/volumes?q=`;

export const getBooksByTitle = async (query: string) => {
    console.log(query, '\n <-- query\n')
  try {
    const response = await axios.get(
      `${BASE_VOL_URL}${query}&key=${GOOGLE_API_KEY}`
    );
    console.log(response.data.items)
    return response.data.items;
  } catch (err) {
    console.error(err);
    throw err
  }
};
