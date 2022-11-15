import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { getAthletes } from "../../slices/data";

export const getAthletesAction = async (
  dispatch: Dispatch<any>,
  coach: string
) => {
  try {
    const { data: athletes } = await axios.get(
      `${checkForEnv(
        process.env.REACT_APP_API_URL
      )}/users/athletes?coach=${coach}`
    );
    console.log(athletes);
    dispatch(
      getAthletes({
        coaches: [],
        clubs: [],
        athletes,
        error: null,
      })
    );
  } catch (error) {
    dispatch(
      getAthletes({
        coaches: [],
        clubs: [],
        athletes: [],
        error: "Błąd pobierania sportowców",
      })
    );
  }
};
