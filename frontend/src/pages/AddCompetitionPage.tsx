import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AthleteRow from "../components/AthleteRow/AthleteRow";
import { getAthletesAction } from "../state/actions/data/getAthletes";
import { setCompetitionAction } from "../state/actions/data/setCompetition";
import { Result } from "../state/slices/data";
import { AppState } from "../state/types";

function AddCompetitionPage() {
  const athletes = useSelector((state: AppState) => state.dataState.athletes);
  const { accessToken, username } = useSelector(
    (state: AppState) => state.userState.user!
  );

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const dispatch = useDispatch();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCompetitionAction({ description, date, time, results }, accessToken);
  };

  // TODO: Remove duplicated code
  const setScore = (athleteId: number, score: string) => {
    setResults((currentResults) => {
      const existedResult = currentResults.find(
        (result) => result.athleteId === athleteId
      );

      if (existedResult) {
        const resultsWithoutNew = currentResults.filter(
          (result) => result.athleteId !== athleteId
        );
        return [
          ...resultsWithoutNew,
          { athleteId, score, rating: existedResult.rating },
        ];
      }
      return [...currentResults, { athleteId, rating: 0, score }];
    });
  };

  const setRating = (athleteId: number, rating: number) => {
    setResults((currentResults) => {
      const existedResult = currentResults.find(
        (result) => result.athleteId === athleteId
      );

      if (existedResult) {
        const resultsWithoutNew = currentResults.filter(
          (result) => result.athleteId !== athleteId
        );
        return [
          ...resultsWithoutNew,
          { athleteId, rating, score: existedResult.score },
        ];
      }
      return [...currentResults, { athleteId, rating, score: "1" }];
    });
  };

  useEffect(() => {
    getAthletesAction(dispatch, username!, accessToken);
  }, [username, dispatch, accessToken]);

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Zawody</h2>
      </div>
      <h3>Dodaj zawody</h3>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <input
            className="element-hover"
            type="text"
            id="describe"
            placeholder="Opis"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            className="element-hover"
            type="date"
            id="date"
            placeholder="Data"
            required
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div>
          <input
            className="element-hover"
            type="time"
            id="time"
            placeholder="Godzina"
            required
            onChange={(e) => setTime(e.target.value)}
          ></input>
        </div>
        {athletes &&
          athletes.map(({ username, id }) => (
            <AthleteRow
              key={id}
              id={id}
              username={username}
              rating={0}
              score={""}
              setScore={setScore}
              setRating={setRating}
            ></AthleteRow>
          ))}
        <div>
          <button className="primary element-hover" type="submit">
            Dodaj zawody
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCompetitionPage;
