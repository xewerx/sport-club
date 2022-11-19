import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompetitionsAction } from "../state/actions/data/getCompetitions";
import { updateResultAction } from "../state/actions/data/updateResult";
import { AppState } from "../state/types";

function EditCompetitionPage() {
  const competitions = useSelector(
    (state: AppState) => state.dataState.competitions
  );
  const { accessToken, username } = useSelector(
    (state: AppState) => state.userState.user!
  );

  const dispatch = useDispatch();

  // TODO remake it to controlled inputs
  const setResultHandler = (id: number) => () => {
    const scoreInput = (
      document.getElementById(`score-${id}`) as HTMLInputElement
    ).value;
    const score = scoreInput
      ? scoreInput
      : (document.getElementById(`score-${id}`) as HTMLInputElement)
          .placeholder;
    const ratingInput = (
      document.getElementById(`rating-${id}`) as HTMLInputElement
    ).value;
    const rating = ratingInput
      ? ratingInput
      : (document.getElementById(`rating-${id}`) as HTMLInputElement)
          .placeholder;
    // @ts-ignore
    updateResultAction({ id, score, rating }, accessToken);
  };

  useEffect(() => {
    getCompetitionsAction(username, accessToken, dispatch);
  }, [username, dispatch, accessToken]);

  console.log(competitions);
  return (
    <div className="screen-container">
      <div className="caption">
        <h2>Oceny</h2>
      </div>
      <h3>Edytuj oceny</h3>
      {competitions &&
        competitions.map(({ description, date, time, results }) => (
          <div className="competition-container">
            <div className="competition-header">
              <p>{description}</p>
              <p>{date}</p>
              <p>{time}</p>
            </div>
            {results.map(({ id, athlete, rating, score }) => (
              <form className="competition-row" key={id}>
                <p>{athlete.username}</p>
                <input
                  id={`score-${id}`}
                  type="text"
                  placeholder={score}
                  required
                ></input>
                <input
                  type="number"
                  placeholder={rating as unknown as string}
                  required
                  id={`rating-${id}`}
                  min="1"
                  max="10"
                ></input>
                <button
                  className="primary element-hover"
                  onClick={setResultHandler(id)}
                >
                  Zapisz
                </button>
              </form>
            ))}
          </div>
        ))}
    </div>
  );
}

export default EditCompetitionPage;
