import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { readMessage } from "../../slices/data";

export const readMessageAction = async (
  id: number,
  token: string,
  dispatch: Dispatch<any>
) => {
  try {
    await axios.patch(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/messages/read`,
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(
      readMessage({
        data: id,
      })
    );
  } catch (error) {
    console.log("error");
  }
};
