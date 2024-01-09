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
import InfoPopup from "./InfoPopup/InfoPopup";
import * as mainApi from "../utils/MainApi";
import * as moviesApi from "../utils/MoviesApi";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [searched, setSearched] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);

  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);

  const [query, setQuery] = useState(localStorage.getItem("query") || "");

  const token = localStorage.getItem("token");

  // Получение и обработка фильмов

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([mainApi.getProfile(), mainApi.getSavedMovies()])
        .then(([profile, savedMovies]) => {
          setCurrentUser(profile);
          setSavedMovies(savedMovies);
        })
        .catch(() => setIsLoadingError(true));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (movies.length > 0 && savedMovies.length > 0) {
      const updatedMovies = updateMovies(movies);
      const foundMovies = filterSearch(updatedMovies, query);
      setFoundMovies(foundMovies);
    }
  }, [savedMovies]);

  useEffect(() => {
    if (query && movies.length > 0) {
      const foundMovies = filterSearch(movies, query);
      setFoundMovies(foundMovies);
    }
  }, [query, movies]);

  const getAllMovies = () => {
    setIsLoadingMovies(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        updateMovies(movies);
      })
      .catch(() => setIsLoadingError(true))
      .finally(() => setIsLoadingMovies(false));
  };

  const updateMovies = (movies) => {
    const updatedMovies = movies.map((movie) => {
      const savedMovie = savedMovies.find((userSavedMovie) => {
        return userSavedMovie.movieId === movie.id;
      });

      if (savedMovie) {
        return {
          ...movie,
          owner: savedMovie.owner,
          _id: savedMovie._id,
          isLiked: true,
        };
      } else {
        return {
          ...movie,
          owner: null,
          _id: null,
          isLiked: false,
        };
      }
    });
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    setMovies(updatedMovies);
    return updatedMovies;
  };

  const handleSearch = (query) => {
    setQuery(query);
    localStorage.setItem("query", query);
    setSearched(true);
    if (movies.length === 0) {
      getAllMovies();
    }
  };

  const filterSearch = (movies, query) =>
    movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase())
    );

  // Проверка токена

  useEffect(() => {
    if (token) {
      handleTokenCheck(token);
    } else {
      localStorage.clear();
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

  const handleOpenPopup = ({ title, buttonText }) => {
    setIsPopup(true);
    setPopupInfo({ title, buttonText });
  };

  const handleClosePopup = () => {
    setIsPopup(false);
    setPopupInfo({});
  };

  // Мобильное меню

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
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register
                  setIsLoggedIn={setIsLoggedIn}
                  handleOpenPopup={handleOpenPopup}
                />
              )
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  handleOpenPopup={handleOpenPopup}
                />
              )
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
                    <Movies
                      isNothingFound={isNothingFound}
                      setIsNothingFound={setIsNothingFound}
                      searched={searched}
                      movies={foundMovies}
                      handleSearch={handleSearch}
                      setSavedMovies={setSavedMovies}
                      isLoadingMovies={isLoadingMovies}
                      isLoadingError={isLoadingError}
                    />
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
                    <SavedMovies
                      isNothingFound={isNothingFound}
                      setIsNothingFound={setIsNothingFound}
                      savedMovies={savedMovies}
                      setSavedMovies={setSavedMovies}
                    />
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
                      setMovies={setMovies}
                      setSavedMovies={setSavedMovies}
                      setFoundMovies={setFoundMovies}
                      setQuery={setQuery}
                      setIsNothingFound={setIsNothingFound}
                      setSearched={setSearched}
                    />
                  </>
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {isPopup && (
          <InfoPopup
            title={popupInfo.title}
            buttonText={popupInfo.buttonText}
            onClick={handleClosePopup}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}
