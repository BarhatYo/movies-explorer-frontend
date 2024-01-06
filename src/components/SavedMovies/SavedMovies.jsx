import React, { useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

export default function SavedMovies({ savedMovies, setSavedMovies }) {
  const [isShort, setIsShort] = useState(false);
  const [foundSavedMovies, setFoundSavedMovies] = useState(savedMovies);

  const findSavedMovies = (query) => {
    const foundMovies = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase())
    );
    setFoundSavedMovies(foundMovies);
  };

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearch={findSavedMovies}
        isSaved={true}
        isShort={isShort}
        setIsShort={setIsShort}
      />
      <MoviesCardList
        isShort={isShort}
        movies={foundSavedMovies}
        isSavedMovies={true}
        setSavedMovies={setSavedMovies}
        setFoundSavedMovies={setFoundSavedMovies}
      />
    </main>
  );
}
