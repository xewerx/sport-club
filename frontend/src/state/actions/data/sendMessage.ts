import axios from "axios";
import { checkForEnv } from "../../../utils/checkForEnv";

interface MessageInput {
  content: string;
  to: string[];
}

export const sendMessageAction = async (
  message: MessageInput,
  token: string
) => {
  try {
    await axios.post(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/messages`,
      message,
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
