import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";
import { axios } from "./config/config";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

const App = () => {
  const { login } = useSelector((state) => state);
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <NavBar />
        <AppRoutes authenticated={login.authenticated} />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
