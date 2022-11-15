import axios from "axios";
import { Dispatch } from "react";
import { checkForEnv } from "../../../utils/checkForEnv";
import { signIn } from "../../slices/user";

export const loginAction = async (
  email: string,
  password: string,
  dispatch: Dispatch<any>
) => {
  try {
    const { data: user } = await axios.post(
      `${checkForEnv(process.env.REACT_APP_API_URL)}/auth/login`,
      {
        username: email,
        password,
      }
    );
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(
      signIn({
        user,
        loading: false,
        error: null,
      })
    );
  } catch (error) {
    dispatch(
      signIn({
        user: null,
        loading: false,
        error: "Błąd logowania",
      })
    );
  }
};
