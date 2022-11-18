import axios from "axios";
import { checkForEnv } from "../../../utils/checkForEnv";

interface ResultUpdateInput {
  id: number;
  score: string;
  rating: number;
}

export const updateResultAction = async (
  resultUpdateInput: ResultUpdateInput,
  token: string
) => {
  try {
    await axios.patch(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/results`,
      {
        ...resultUpdateInput,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("error");
  }
};
