import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { getMessages } from "../../slices/data";

export const getMessagesForCoachAction = async (
  token: string,
  dispatch: Dispatch<any>
) => {
  try {
    const { data: messages } = await axios.get(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/messages/coach`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(
      getMessages({
        data: messages,
      })
    );
  } catch (error) {
    dispatch(
      getMessages({
        data: [],
        error: "Błąd pobierania wiadomości",
      })
    );
  }
};
