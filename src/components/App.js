import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Register from "./Register/Register";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";
import Movies from "./Movies/Movies";
import Profile from "./Profile/Profile";
import SavedMovies from "./SavedMovies/SavedMovies";
import ProtectedRoute from "./ProtectedRoute";
import * as mainApi from "../utils/MainApi";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || {}
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      handleTokenCheck(token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("lastSearch");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("savedMovies");
      localStorage.removeItem("foundMoviesFromBeatFilm");
      localStorage.removeItem("currentUser");
    }
  }, [token]);

  const handleTokenCheck = (token) => {
    if (token) {
      mainApi
        .checkToken(token)
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleBurgerClick = () => {
    setIsMobile(!isMobile);
  };

  const handleMobileMenuClick = () => {
    setIsMobile(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/signup"
            element={
              <Register
                setCurrentUser={setCurrentUser}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  isMobile={isMobile}
                  handleBurgerClick={handleBurgerClick}
                  handleMobileMenuClick={handleMobileMenuClick}
                />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      isMobile={isMobile}
                      handleBurgerClick={handleBurgerClick}
                      handleMobileMenuClick={handleMobileMenuClick}
                    />
                    <Movies />
                    <Footer />
                  </>
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      isMobile={isMobile}
                      handleBurgerClick={handleBurgerClick}
                      handleMobileMenuClick={handleMobileMenuClick}
                    />
                    <SavedMovies />
                    <Footer />
                  </>
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      isMobile={isMobile}
                      handleBurgerClick={handleBurgerClick}
                      handleMobileMenuClick={handleMobileMenuClick}
                    />
                    <Profile
                      setCurrentUser={setCurrentUser}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  </>
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}
