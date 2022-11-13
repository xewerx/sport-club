import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClubsAction } from "../state/actions/data/getClubs";
import { setClubAction } from "../state/actions/user/setClubAction";
import { AppState } from "../state/types";

function ClubPage() {
  const [club, setClub] = useState("");
  const user = useSelector((state: AppState) => state.userState.user);
  const clubs = useSelector((state: AppState) => state.dataState.clubs);
  const clubsWithNull = [...clubs, { id: null, name: "Brak" }];
  const dispatch = useDispatch();

  const setNewClub = (clubName: string) => {
    const { id } = clubs.find((club) => club.name === clubName) ?? { id: null };
    setClub(clubName);
    setClubAction(id, user!.id);
  };

  useEffect(() => {
    getClubsAction(dispatch, user?.coach!);
  }, [dispatch, user?.coach]);

  useEffect(() => {
    setClub(user?.clubName ?? "");
  }, [user?.clubName]);

  return (
    <>
      <div>Mój trener: {user?.coach}</div>
      <div>Mój obecny klub: {club || "Brak"}</div>
      <div>Zmień klub:</div>
      <div>
        <select
          className="element-hover"
          id="club"
          placeholder="Klub"
          required
          onChange={(e) => setNewClub(e.target.value)}
        >
          {clubsWithNull?.map((club) => (
            <option key={club.id}>{club.name}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ClubPage;
