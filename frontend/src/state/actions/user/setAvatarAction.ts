import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";

export const setAvatarAction = async (
  dispatch: Dispatch<any>,
  avatar: string,
  userId: number
) => {
  try {
    await axios.post(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/users/avatar`,
      {
        userId,
        avatar,
      }
    );
  } catch (error) {
    console.log("error");
  }
};
