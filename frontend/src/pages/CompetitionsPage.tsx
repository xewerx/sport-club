import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResultsAction } from "../state/actions/data/getResults";
import { AppState } from "../state/types";

function CompetitionPage() {
  const results = useSelector((state: AppState) => state.dataState.results);
  const { accessToken, id } = useSelector(
    (state: AppState) => state.userState.user!
  );

  const dispatch = useDispatch();

  console.log(results);

  useEffect(() => {
    getResultsAction(id!, accessToken, dispatch);
  }, [dispatch, accessToken, id]);

  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Moje Wyniki</h2>
      </div>
      {results.map(({ competition, score, rating }) => (
        <div className="result-row">
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

export default CompetitionPage;
