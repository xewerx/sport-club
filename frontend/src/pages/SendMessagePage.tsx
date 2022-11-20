import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAthletesAction } from "../state/actions/data/getAthletes";
import { getMessagesForCoachAction } from "../state/actions/data/getMessagesForCoach";
import { sendMessageAction } from "../state/actions/data/sendMessage";
import { AppState } from "../state/types";

const SendMessagePage: React.FC = () => {
  const athletes = useSelector((state: AppState) => state.dataState.athletes);
  const { accessToken, username } = useSelector(
    (state: AppState) => state.userState.user!
  );
  const messages = useSelector((state: AppState) => state.dataState.messages);

  const [message, setMessage] = useState("");
  const [athlete, setAthletes] = useState("Do wszystkich");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (athlete === "Do wszystkich") {
      sendMessageAction(
        { content: message, to: athletes.map(({ username }) => username) },
        accessToken
      );
    } else {
      sendMessageAction({ content: message, to: [athlete] }, accessToken);
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getAthletesAction(dispatch, username!, accessToken);
    getMessagesForCoachAction(accessToken, dispatch);
  }, [username, dispatch, accessToken]);

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Wyślij wiadomość</h2>
      </div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <select
            className="element-hover"
            id="trainer"
            placeholder="Trener"
            required
            onChange={(e) => setAthletes(e.target.value)}
          >
            {athletes.length > 0 &&
              athletes?.map(({ username, id }) => (
                <option key={id}>{username}</option>
              ))}
            <option>Do wszystkich</option>
          </select>
        </div>
        <div>
          <textarea
            className="element-hover"
            id="message"
            placeholder="Wiadomość"
            required
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button className="primary element-hover" type="submit">
            Wyślij
          </button>
        </div>
      </form>
      <div className="caption">
        <h2>Wysłane wiadomości</h2>
        {messages ? (
          messages.map(({ content, createdAt, id, isReadByAll }) => (
            <div className="message" key={id}>
              {isReadByAll && <p>✓</p>}
              <p>{new Date(createdAt).toLocaleString()}</p>
              <p>{content}</p>
            </div>
          ))
        ) : (
          <p>Brak wiadomości</p>
        )}
      </div>
    </div>
  );
};

export default SendMessagePage;
