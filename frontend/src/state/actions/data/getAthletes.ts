import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { getAthletes } from "../../slices/data";

export const getAthletesAction = async (
  dispatch: Dispatch<any>,
  coach: string,
  token: string
) => {
  try {
    const { data: athletes } = await axios.get(
      `${checkForEnv(
        process.env.REACT_APP_API_URL
      )}/users/athletes?coach=${coach}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(athletes);
    dispatch(getAthletes({ data: athletes }));
  } catch (error) {
    dispatch(
      getAthletes({
        data: [],
        error: "Błąd pobierania sportowców",
      })
    );
  }
};
