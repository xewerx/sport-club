import axios from "axios";
import { checkForEnv } from "../../../utils/checkForEnv";

export interface Result {
  id: number;
  score: string;
  rating: number;
}

export interface Competition {
  description: string;
  date: string;
  time: string;
  results: Result[];
}

export const setCompetitionAction = async (
  competition: Competition,
  token: string
) => {
  try {
    await axios.post(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/competition`,
      {
        competition,
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
