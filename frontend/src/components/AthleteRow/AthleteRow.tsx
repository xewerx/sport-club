import React from "react";

interface Props {
  id: number;
  username: string;
  score: string;
  rating: number;
  setScore: (id: number, score: string) => void;
  setRating: (id: number, rating: number) => void;
}

function AthleteRow({
  username,
  score,
  rating,
  setRating,
  setScore,
  id,
}: Props) {
  return (
    <div className="athlete-row">
      <div>
        <p>{username}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Wynik"
          required
          onChange={(e) => setScore(id, e.target.value)}
        ></input>
      </div>
      <div>
        <input
          type="number"
          placeholder="Ocena"
          required
          min="1"
          max="10"
          onChange={(e) => setRating(id, e.target.value as unknown as number)}
        ></input>
      </div>
    </div>
  );
}

export default AthleteRow;
