import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Navbar/Header";
import HomeScreen from "./screens/HomeScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MyProfileScreen from "./screens/MyProfileScreen";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <div className="overlayUnder"></div>
        <div className="overlayAbove"></div>
        <Header />
        <main className="row">
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/myprofile" component={MyProfileScreen}></Route>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
