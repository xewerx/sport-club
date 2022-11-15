import axios from "axios";
import { checkForEnv } from "../../../utils/checkForEnv";

export const setClubAction = async (
  clubId: number | null,
  userId: number,
  token: string
) => {
  try {
    await axios.patch(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/users/club`,
      {
        userId,
        clubId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("error");
  }
};
