import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { getCompetitions } from "../../slices/data";

export const getCompetitionsAction = async (
  coach: string,
  token: string,
  dispatch: Dispatch<any>
) => {
  try {
    const { data: competitions } = await axios.get(
      `${checkForEnv(
        process.env.REACT_APP_API_URL
      )}/competition?coach=${coach}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(competitions);
    dispatch(
      getCompetitions({
        data: competitions,
      })
    );
  } catch (error) {
    dispatch(
      getCompetitions({
        data: [],
        error: "Błąd pobierania zawodów",
      })
    );
  }
};
