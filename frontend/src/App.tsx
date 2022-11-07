import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Navbar/Header";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import { AppState } from "./state/types";

const App: React.FC = () => {
  const { user } = useSelector((state: AppState) => state.userState);

  return (
    <>
      <BrowserRouter>
        <div className="overlayUnder"></div>
        <div className="overlayAbove"></div>
        <Header />
        <main className="row">
          <Routes>
            <Route
              path="*"
              element={user ? <HomeScreen /> : <SigninScreen />}
            />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/myprofile" element={<MyProfileScreen />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
