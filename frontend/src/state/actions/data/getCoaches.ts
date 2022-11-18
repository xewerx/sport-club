import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { getCoaches } from "../../slices/data";

export const getCoachesAction = async (dispatch: Dispatch<any>) => {
  try {
    const { data: coaches } = await axios.get(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/users/coaches`
    );
    console.log(coaches);
    dispatch(getCoaches({ data: coaches }));
  } catch (error) {
    dispatch(
      getCoaches({
        data: [],
        error: "Błąd pobierania trenerów",
      })
    );
  }
};
