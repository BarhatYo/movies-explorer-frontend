import React, { useEffect, useState, useContext } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";

export default function Movies() {
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoadingSavedMovies, setIsLoadingSavedMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isShort, setIsShort] = useState(localStorage.getItem('isShort') === 'true' || false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const getCurrentUserSavedMovies = () => {
    return mainApi.getSavedMovies().then((movies) => {
      if (movies.length === 0) {
        return [];
      }
      const filtredMovies = movies.filter(
        (movie) => movie.owner === currentUser._id
      );
      return filtredMovies;
    });
  };

  const findMovies = (query) => {
    setIsLoadingMovies(true);
    setIsLoadingSavedMovies(true);
    setIsSearch(true);

    moviesApi
      .getMovies()
      .then((movies) => {
        const foundMovies = movies.filter((movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase())
        );
        if (foundMovies.length === 0) {
          setIsNothingFound(true);
        } else {
          setIsNothingFound(false);
        }
        localStorage.setItem(
          "foundMoviesFromBeatFilm",
          JSON.stringify(foundMovies)
        );
        localStorage.setItem("lastSearch", query);
        return getCurrentUserSavedMovies();
      })
      .then((savedMovies) => {
        updateMovies(savedMovies);
      })
      .catch((error) => {
        console.error("При загрузке фильмов произошла ошибка", error);
      })
      .finally(() => {
        setIsLoadingMovies(false);
        setIsLoadingSavedMovies(false);
      });
  };

  const updateMovies = (filtredMovies) => {
    const foundMoviesFromBeatFilm = JSON.parse(
      localStorage.getItem("foundMoviesFromBeatFilm")
    );
    if (filtredMovies && filtredMovies.length > 0) {
      const updatedMovies = foundMoviesFromBeatFilm.map((movie) => {
        const savedMovie = filtredMovies.find(
          (filtredMovie) =>
            filtredMovie.movieId === movie.id &&
            filtredMovie.owner === currentUser._id
        );

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
            owner: undefined,
            _id: undefined,
            isLiked: false,
          };
        }
      });
      setMovies(updatedMovies);
    } else {
      setMovies(foundMoviesFromBeatFilm);
    }
  };

  const updateMoviesAfterLike = () => {
    getCurrentUserSavedMovies().then((filtredMovies) =>
      updateMovies(filtredMovies)
    );
  };

  useEffect(() => {
    if (localStorage.getItem("lastSearch") && localStorage.getItem("token")) {
      getCurrentUserSavedMovies().then((filteredMovies) =>
        updateMovies(filteredMovies)
      );
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm
        findMovies={findMovies}
        movies={movies}
        isShort={isShort}
        setIsShort={setIsShort}
      />
      {isLoadingMovies || isLoadingSavedMovies ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isNothingFound={isNothingFound}
          setIsNothingFound={setIsNothingFound}
          isSearch={isSearch}
          movies={movies}
          isSavedMovies={false}
          isShort={isShort}
          updateMoviesAfterLike={updateMoviesAfterLike}
        />
      )}
    </main>
  );
}
