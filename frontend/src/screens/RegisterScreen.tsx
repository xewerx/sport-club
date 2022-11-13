import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import AuthGuard from "../hooks/authGuard";
import { getCoachesAction } from "../state/actions/data/getCoaches";
import { registerAction } from "../state/actions/user/registerAction";
import { AppState } from "../state/types";

const RegisterScreen: React.FC = () => {
  const [role, setRole] = useState("Trener");
  const [email, setEmail] = useState("");
  const [coach, setCoach] = useState<undefined | string>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationPasswordError, setValidationPasswordError] = useState("");
  const [isText, setIsText] = useState(false);

  const { user, error, loading } = useSelector(
    (state: AppState) => state.userState
  );
  AuthGuard(user);

  const coaches = useSelector((state: AppState) => state.dataState.coaches);

  const strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  const showPassword = () => {
    let password = document.getElementById("password") as HTMLInputElement;
    let confirmPassword = document.getElementById(
      "confirmPassword"
    ) as HTMLInputElement;
    if (isText) {
      password.type = "text";
      confirmPassword.type = "text";
    } else {
      password.type = "password";
      confirmPassword.type = "password";
    }
    setIsText(!isText);
  };

  const dispatch = useDispatch();
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValidationPasswordError("Hasla nie sa takie same");
    }
    // else if (!strongPassword.test(password)) {
    //   setValidationPasswordError("Haslo jest zbyt slabe");
    // }
    else {
      setValidationPasswordError("");
      registerAction(email, password, role, coach, dispatch);
    }
  };

  useEffect(() => {
    getCoachesAction(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setCoach(coaches[0]?.username ?? "");
  }, [coaches, dispatch]);

  console.log(coach);
  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Zarejestruj się</h2>
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
        <div className="form-group">
          <input
            className="element-hover"
            type="password"
            id="confirmPassword"
            placeholder="Potwierdź hasło"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <select
            className="element-hover"
            id="role"
            placeholder="Rola"
            required
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Trener</option>
            <option>Sportowiec</option>
          </select>
        </div>
        {role === "Sportowiec" && (
          <div>
            <select
              className="element-hover"
              id="trainer"
              placeholder="Trener"
              required
              onChange={(e) => setCoach(e.target.value)}
            >
              {coaches.length > 0 &&
                coaches?.map(({ username, id }) => (
                  <option key={id}>{username}</option>
                ))}
            </select>
          </div>
        )}

        {validationPasswordError ? (
          <MessageBox variant="danger">{validationPasswordError}</MessageBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <></>
        )}
        {loading && <LoadingBox></LoadingBox>}
        <div>
          <button className="primary element-hover" type="submit">
            Zarejestruj się
          </button>
        </div>
        <label>
          Posiadasz juz konto? <Link to={`/signin`}>Zaloguj się!</Link>
        </label>
      </form>
    </div>
  );
};

export default RegisterScreen;
