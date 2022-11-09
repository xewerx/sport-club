import { Dispatch } from "react";
import { signOut } from "../../slices/user";

export const logoutAction = async (dispatch: Dispatch<any>) => {
  dispatch(signOut());
};
