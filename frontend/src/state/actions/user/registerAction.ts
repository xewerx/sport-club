import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { signIn } from "../../slices/user";

export const registerAction = async (
  email: string,
  password: string,
  role: string,
  coach: string | undefined,
  dispatch: Dispatch<any>
) => {
  try {
    const { data: user } = await axios.post(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/auth/register`,
      {
        username: email,
        password,
        role,
        ...(role === "Sportowiec" ? { coach } : {}),
      }
    );
    console.log(user);
    dispatch(
      signIn({
        user,
        loading: false,
        error: null,
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      signIn({
        user: null,
        loading: false,
        error: "Błąd podczas rejestracji",
      })
    );
  }
};
