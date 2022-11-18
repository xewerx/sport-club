import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { getResults } from "../../slices/data";

export const getResultsAction = async (
  athleteId: number,
  token: string,
  dispatch: Dispatch<any>
) => {
  try {
    const { data: competitions } = await axios.get(
      `${checkForEnv(
        process.env.REACT_APP_API_URL
      )}/results?athleteId=${athleteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(competitions);
    dispatch(
      getResults({
        data: competitions,
      })
    );
  } catch (error) {
    dispatch(
      getResults({
        data: [],
        error: "Błąd pobierania rezultatów",
      })
    );
  }
};
