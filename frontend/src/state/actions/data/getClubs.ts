import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { getClubs } from "../../slices/data";

export const getClubsAction = async (
  dispatch: Dispatch<any>,
  owner: string,
  token: string
) => {
  try {
    const { data: clubs } = await axios.get(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/clubs/${owner}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(clubs);
    dispatch(getClubs({ data: clubs }));
  } catch (error) {
    dispatch(
      getClubs({
        data: [],
        error: "Błąd pobierania trenerów",
      })
    );
  }
};
