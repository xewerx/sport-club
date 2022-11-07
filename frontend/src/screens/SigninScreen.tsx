import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import AuthGuard from "../hooks/authGuard";
import { loginAction } from "../state/actions/loginAction";
import { AppState } from "../state/types";

const SigninScreen: React.FC = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isText, setIsText] = useState(false);
  const dispatch = useDispatch();

  const { user, error, loading } = useSelector(
    (state: AppState) => state.userState
  );
  AuthGuard(user);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    loginAction(email, password, dispatch);
  };

  const showPassword = () => {
    let password = document.getElementById("password") as HTMLInputElement;
    isText ? (password!.type = "password") : (password!.type = "text");
    setIsText(!isText);
  };

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Zaloguj się</h2>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <input
            className="element-hover"
            type="email"
            id="email"
            placeholder="Adres e-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <input
            className="element-hover"
            type="password"
            id="password"
            placeholder="Hasło"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <span
            className="fa fa-fw field-icon fa-eye"
            onClick={showPassword}
          ></span>
        </div>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {loading && <LoadingBox></LoadingBox>}
        <div>
          <button className="primary element-hover" type="submit">
            Zaloguj się
          </button>
        </div>
        <label>
          Nie posiadasz konta? <Link to={`/register`}>Zarejestruj się!</Link>
        </label>
      </form>
    </div>
  );
};

export default SigninScreen;
