import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function Movies({
  handleSearch,
  movies,
  setSavedMovies,
  isLoadingMovies,
  isLoadingError,
  searched,
  isNothingFound,
  setIsNothingFound,
}) {
  const [isShort, setIsShort] = useState(
    localStorage.getItem("isShort") === "true" || false
  );

  return (
    <main className="movies">
      <SearchForm
        handleSearch={handleSearch}
        movies={movies}
        isShort={isShort}
        setIsShort={setIsShort}
      />
      {isLoadingMovies ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={movies}
          isSavedMovies={false}
          isShort={isShort}
          searched={searched}
          setSavedMovies={setSavedMovies}
          isLoadingError={isLoadingError}
          isNothingFound={isNothingFound}
          setIsNothingFound={setIsNothingFound}
        />
      )}
    </main>
  );
}
