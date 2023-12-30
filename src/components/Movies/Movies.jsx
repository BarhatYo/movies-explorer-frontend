import React, { useEffect, useState, useContext } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";

export default function Movies() {
  const [films, setFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(true);
  const [isLoadingSavedFilms, setIsLoadingSavedFilms] = useState(true);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = () => {
    moviesApi
      .getMovies()
      .then((films) => setFilms(films))
      .catch((error) => {
        console.error('Error fetching movies:', error);
      })
      .finally(setIsLoadingFilms(false));
    mainApi
      .getSavedMovies()
      .then((savedFilms) => setSavedFilms(savedFilms))
      .catch((error) => {
        console.error('Error fetching movies:', error);
      })
      .finally(setIsLoadingSavedFilms(false));
  };

  const updatedFilms = films.map((film) => {
    const savedFilm = savedFilms.find(
      (saved) => saved.movieId === film.id && saved.owner === currentUser._id
    );

    if (savedFilm) {
      return {
        ...film,
        owner: savedFilm.owner,
        _id: savedFilm._id,
        isLiked: true,
      };
    }

    return {
      ...film,
      owner: null,
      _id: null,
      isLiked: false,
    };
  });

  const findMovies = (query, isShort) => {
    const filtredFilms = updatedFilms.filter((film) => {
      return isShort
        ? film.nameRU.toLowerCase().includes(query.toLowerCase()) &&
            film.duration <= 40
        : film.nameRU.toLowerCase().includes(query.toLowerCase());
    });
    setFoundMovies(filtredFilms);
    localStorage.setItem("lastSearch", JSON.stringify({ query, isShort }));
  };

  return (
    <main className="movies">
      <SearchForm findMovies={findMovies} films={films} />
      {isLoadingFilms || isLoadingSavedFilms ? (
        <Preloader />
      ) : (
        <MoviesCardList
          films={foundMovies}
          isSavedMovies={false}
          getAllMovies={getAllMovies}
        />
      )}
    </main>
  );
}
