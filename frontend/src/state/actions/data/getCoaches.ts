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
    dispatch(
      getCoaches({
        coaches,
        error: null,
      })
    );
  } catch (error) {
    dispatch(
      getCoaches({
        coaches: [],
        error: error as string,
      })
    );
  }
};