import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../state/slices/user";

const AuthGuard = (user: User | null) => {
  const history = useNavigate();
  useEffect(() => {
    if (user) {
      history("/");
    }
  }, [history, user]);
};

export default AuthGuard;
