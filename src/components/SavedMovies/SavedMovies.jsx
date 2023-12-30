import React, { useEffect, useState, useContext } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import * as mainApi from "../../utils/MainApi";

export default function SavedMovies() {
  const [films, setFilms] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoadingFilms, setIsLoadingFilms] = useState(true);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    mainApi
      .getSavedMovies()
      .then((movies) =>
        movies.filter((movie) => movie.owner === currentUser._id)
      )
      .then((userSavedMovies) => setFilms(userSavedMovies))
      .finally(setIsLoadingFilms(false));
  }, []);

  const updateSavedFilms = () => {
    mainApi
      .getSavedMovies()
      .then((movies) => setFilms(movies))
      .finally(setIsLoadingFilms(false));
  };

  const findSavedMovies = (query, isShort) => {
    const filtredMovies = films.filter((movie) => {
      return isShort
        ? movie.nameRU.toLowerCase().includes(query.toLowerCase()) &&
            movie.duration <= 40
        : movie.nameRU.toLowerCase().includes(query.toLowerCase());
    });
    setFoundSavedMovies(filtredMovies);
    setIsSearched(true);
  };

  console.log(films)

  return (
    <main className="saved-movies">
      <SearchForm findMovies={findSavedMovies} films={films} isSaved={true} />
      {isLoadingFilms ? (
        <Preloader />
      ) : (
        <MoviesCardList
          films={isSearched ? foundSavedMovies : films}
          isSavedMovies={true}
          onDelete={updateSavedFilms}
        />
      )}
    </main>
  );
}
