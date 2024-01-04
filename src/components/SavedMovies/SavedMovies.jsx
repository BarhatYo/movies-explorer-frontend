import React, { useEffect, useState, useContext } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import * as mainApi from "../../utils/MainApi";

export default function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(true);
  const [isShort, setIsShort] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((savedMovies) =>
        savedMovies.filter((savedMovie) => savedMovie.owner === currentUser._id)
      )
      .then((filteredMovies) => {
        setSavedMovies(filteredMovies);
        localStorage.setItem("savedMovies", JSON.stringify(filteredMovies));
      })
      .finally(setIsLoadingFilms(false));
  }, []);

  const updateSavedFilms = () => {
    mainApi
      .getSavedMovies()
      .then((movies) => setSavedMovies(movies))
      .finally(setIsLoadingFilms(false));
  };

  const findSavedMovies = (query) => {
    setIsSearch(true);
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const filteredMovies = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredMovies.length === 0) {
      setIsNothingFound(true);
    } else {
      setIsNothingFound(false);
    }
    setSavedMovies(filteredMovies);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        findMovies={findSavedMovies}
        isSaved={true}
        isShort={isShort}
        setIsShort={setIsShort}
      />
      {isLoadingFilms ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isNothingFound={isNothingFound}
          setIsNothingFound={setIsNothingFound}
          isSearch={isSearch}
          isShort={isShort}
          setIsShort={setIsShort}
          movies={savedMovies}
          isSavedMovies={true}
          onDelete={updateSavedFilms}
        />
      )}
    </main>
  );
}
