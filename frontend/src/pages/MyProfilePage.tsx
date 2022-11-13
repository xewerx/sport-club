import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox/MessageBox";
import { setAvatarAction } from "../state/actions/user/setAvatarAction";
import { AppState } from "../state/types";

const MyProfileScreen: React.FC = (props) => {
  const { user } = useSelector((state: AppState) => state.userState);

  const dispatch = useDispatch();

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
        setSize(file.size);
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

    setAvatarAction(dispatch, base64, user?.id!);
    console.log(base64);
  };

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Mój profil</h2>
      </div>

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
