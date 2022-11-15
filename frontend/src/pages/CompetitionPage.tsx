import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AthleteRow from "../components/AthleteRow/AthleteRow";
import { getAthletesAction } from "../state/actions/data/getAthletes";
import {
  Result,
  setCompetitionAction,
} from "../state/actions/data/setCompetition";
import { AppState } from "../state/types";

function CompetitionPage() {
  const athletes = useSelector((state: AppState) => state.dataState.athletes);
  const coach = useSelector(
    (state: AppState) => state.userState.user?.username
  );

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const dispatch = useDispatch();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCompetitionAction({ description, date, time, results });
  };

  // TODO: Remove duplicated code
  const setScore = (id: number, score: string) => {
    setResults((currentResults) => {
      const existedResult = currentResults.find((result) => result.id === id);

      if (existedResult) {
        const resultsWithoutNew = currentResults.filter(
          (result) => result.id !== id
        );
        return [
          ...resultsWithoutNew,
          { id, score, rating: existedResult.rating },
        ];
      }
      return [...currentResults, { id, rating: 0, score }];
    });
  };

  const setRating = (id: number, rating: number) => {
    setResults((currentResults) => {
      const existedResult = currentResults.find((result) => result.id === id);

      if (existedResult) {
        const resultsWithoutNew = currentResults.filter(
          (result) => result.id !== id
        );
        return [
          ...resultsWithoutNew,
          { id, rating, score: existedResult.score },
        ];
      }
      return [...currentResults, { id, rating, score: "1" }];
    });
  };

  console.log(results);

  useEffect(() => {
    getAthletesAction(dispatch, coach!);
  }, [coach, dispatch]);

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
              rating={1}
              score={"32"}
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

export default CompetitionPage;
