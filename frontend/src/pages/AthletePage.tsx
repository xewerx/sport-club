import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResultsAction } from "../state/actions/data/getResults";
import { AppState } from "../state/types";

function AthletePage() {
  const results = useSelector((state: AppState) => state.dataState.results);
  const { accessToken } = useSelector(
    (state: AppState) => state.userState.user!
  );
  const { athleteId } = useParams();
  console.log(athleteId);
  const dispatch = useDispatch();

  console.log(results);

  useEffect(() => {
    getResultsAction(athleteId as unknown as number, accessToken, dispatch);
  }, [dispatch, accessToken, athleteId]);

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Moje Wyniki</h2>
      </div>
      {results.map(({ competition, score, rating }) => (
        <div className="result-row" key={Math.random()}>
          <p>{competition.description}</p>
          <p>{competition.date}</p>
          <p>{competition.time}</p>
          <p>Wynik: {score}</p>
          <p>Ocena: {rating}</p>
        </div>
      ))}
    </div>
  );
}

export default AthletePage;
