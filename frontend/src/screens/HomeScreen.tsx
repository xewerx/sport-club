import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router";
import ClubPage from "../pages/ClubPage";
import AddCompetitionPage from "../pages/AddCompetitionPage";
import MyProfilePage from "../pages/MyProfilePage";
import { AppState } from "../state/types";
import CompetitionPage from "../pages/CompetitionsPage";
import EditCompetitionPage from "../pages/EditCompetitionPage";
import ReportPage from "../pages/ReportPage";
import SendMessagePage from "../pages/SendMessagePage";
import MessagesPage from "../pages/MessagesPage";

const HomeScreen: React.FC = () => {
  const user = useSelector((state: AppState) => state.userState.user);
  return (
    <div className="screen-container">
      <Routes>
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/competition" element={<CompetitionPage />} />
        <Route path="/add-competition" element={<AddCompetitionPage />} />
        <Route path="/edit-competitions" element={<EditCompetitionPage />} />
        <Route path="/send-message" element={<SendMessagePage />} />
        <Route path="/read-message" element={<MessagesPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route
          path="/club"
          element={user?.role === "Trener" ? <></> : <ClubPage />}
        />
      </Routes>
    </div>
  );
};

export default HomeScreen;
