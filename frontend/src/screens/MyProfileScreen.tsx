import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import AuthGuard from "../hooks/authGuard";
import { AppState } from "../state/types";

const MyProfileScreen: React.FC = (props) => {
  const { user, error, loading } = useSelector(
    (state: AppState) => state.userState
  );
  AuthGuard(user);

  const result = "";

  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [validationPasswordError, setValidationPasswordError] =
    useState<string>("");

  const strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  const dispatch = useDispatch();
  const submitChangePasswordHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValidationPasswordError("Hasła nie są takie same");
    } else if (!strongPassword.test(password)) {
      setValidationPasswordError("Hasło jest zbyt słabe");
    } else {
      setValidationPasswordError("");
    }
  };

  const submitChangeNameHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  // SET AVATAR
  const [imagePreview, setImagePreview] = useState<string>();
  const [base64, setBase64] = useState("");
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState();

  const [errorAvatar, setErrorAvatar] = useState("");

  const onChangeInput = (e: any) => {
    let file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const handleReaderLoaded = (readerEvt: any) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };

  const photoUpload = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        //setFile(file)
        setSize(file.size);
        //setName(file.name)
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileSubmit = (e: any) => {
    e.preventDefault();

    if (Number(size) > 5242880) {
      // bigger than 5MB
      setErrorAvatar("Zbyt duzy plik");
    }

    // dispatch(uploadAvatar(base64));
  };

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Mój profil</h2>
      </div>
      <form className="form my-profile-form" onSubmit={submitChangeNameHandler}>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {loading && <LoadingBox></LoadingBox>}
        {result && <MessageBox variant="success">{result}</MessageBox>}
        <div>
          <input
            className="element-hover"
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <button className="primary element-hover" type="submit">
            Zmień nazwę
          </button>
        </div>
      </form>

      <form
        className="form my-profile-form"
        onSubmit={submitChangePasswordHandler}
      >
        <div>
          <input
            className="element-hover"
            type="password"
            id="password"
            placeholder="Podaj hasło"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            className="element-hover"
            type="password"
            id="confirmPassword"
            placeholder="Potwierdz hasło"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        {validationPasswordError ? (
          <MessageBox variant="danger">{validationPasswordError}</MessageBox>
        ) : (
          <></>
        )}
        <div>
          <button className="primary element-hover" type="submit">
            Zmień hasło
          </button>
        </div>
      </form>

      <form
        className="form my-profile-form"
        onChange={(e) => onChangeInput(e)}
        onSubmit={(e) => onFileSubmit(e)}
      >
        <div>
          <label htmlFor="file" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i>{" "}
            {fileName ? fileName : "Wybierz plik"}
          </label>
          <input
            type="file"
            name="avatar"
            id="file"
            accept=".jpef, .png, .jpg"
            onChange={photoUpload}
            src={imagePreview}
            required
          />
        </div>
        <div>
          <button className="primary element-hover" type="submit">
            Ustaw awatar
          </button>
        </div>
      </form>
      {errorAvatar && <MessageBox variant="danger">{errorAvatar}</MessageBox>}
    </div>
  );
};

export default MyProfileScreen;
