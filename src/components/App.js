import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const isLoggedInStorage = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedInStorage === true &&
      mainApi.getProfile().then((userInfo) => setCurrentUser(userInfo));
  }, [isLoggedInStorage]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    handleTokenCheck(token);
  }, [token]);

  const handleTokenCheck = () => {
    if (token) {
      mainApi
        .checkToken(token)
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    mainApi.register(name, email, password).then(() => {
      handleRegisterLogin(email, password);
      setName("");
      setEmail("");
      setPassword("");
    });
  };

  const handleRegisterLogin = (email, password) => {
    mainApi.login(email, password).then(() => {
      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
      navigate("/movies", { replace: true });
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    mainApi.login(email, password).then(() => {
      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
      navigate("/movies", { replace: true });
    });
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
                name={name}
                email={email}
                password={password}
                handleNameChange={handleNameChange}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                handleRegister={handleRegister}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                email={email}
                password={password}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                handleLogin={handleLogin}
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
                isLoggedIn={isLoggedInStorage}
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
                isLoggedIn={isLoggedInStorage}
              />
            }
            // element={
            //   <>
            //     <Header
            //       isLoggedIn={isLoggedIn}
            //       isMobile={isMobile}
            //       handleBurgerClick={handleBurgerClick}
            //       handleMobileMenuClick={handleMobileMenuClick}
            //     />
            //     <SavedMovies />
            //     <Footer />
            //   </>
            // }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  isMobile={isMobile}
                  handleBurgerClick={handleBurgerClick}
                  handleMobileMenuClick={handleMobileMenuClick}
                />
                <Profile />
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}
