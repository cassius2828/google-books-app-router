import axios from "axios";
import { NextRequest } from "next/server";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_VOL_URL = process.env.BASE_VOL_URL;
export async function GET(request: NextRequest) {
  let builtParams;
  try {
    const response = await axios.get(
      `${BASE_VOL_URL}${builtParams}&key=${GOOGLE_API_KEY}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error(String(err));
  }
}

// export const advancedSearchAction = async (params: AdvancedSearchParams) => {
//     const response = await axios.get(``)
//   };
