import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { getClubs } from "../../slices/data";

export const getClubsAction = async (
  dispatch: Dispatch<any>,
  owner: string
) => {
  try {
    const { data: clubs } = await axios.get(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/clubs/${owner}`
    );
    console.log(clubs);
    dispatch(
      getClubs({
        coaches: [],
        clubs,
        athletes: [],
        error: null,
      })
    );
  } catch (error) {
    dispatch(
      getClubs({
        coaches: [],
        clubs: [],
        athletes: [],
        error: "Błąd pobierania trenerów",
      })
    );
  }
};
