import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAthletesAction } from "../state/actions/data/getAthletes";
import { getMessagesForAthleteAction } from "../state/actions/data/getMessagesForAthlete";
import { readMessageAction } from "../state/actions/data/readMessage";
import { AppState } from "../state/types";

const MessagePage: React.FC = () => {
  const { accessToken, username } = useSelector(
    (state: AppState) => state.userState.user!
  );
  const messages = useSelector((state: AppState) => state.dataState.messages);
  const dispatch = useDispatch();

  const readMessageHandler = (id: number) => () => {
    readMessageAction(id, accessToken, dispatch);
  };

  useEffect(() => {
    getAthletesAction(dispatch, username!, accessToken);
    getMessagesForAthleteAction(accessToken, dispatch);
  }, [username, dispatch, accessToken]);

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Wiadomości od trenera</h2>
        {messages ? (
          messages.map(({ content, createdAt, id, isRead }) => (
            <div className="message" key={id}>
              {!isRead && (
                <button
                  className="primary element-hover"
                  onClick={readMessageHandler(id)}
                >
                  Odczytaj
                </button>
              )}
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

export default MessagePage;
