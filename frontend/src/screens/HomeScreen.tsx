import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router";
import ClubPage from "../pages/ClubPage";
import MyProfileScreen from "../pages/MyProfilePage";
import { AppState } from "../state/types";

const HomeScreen: React.FC = () => {
  const user = useSelector((state: AppState) => state.userState.user);
  return (
    <div className="screen-container">
      <Routes>
        <Route path="/profile" element={<MyProfileScreen />} />
        <Route
          path="/club"
          element={user?.role === "Trener" ? <></> : <ClubPage />}
        />
      </Routes>
    </div>
  );
};

export default HomeScreen;
