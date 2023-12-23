import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import filmsData from "../../constants/films.js";

export default function SavedMovies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedFilms, setSavedFilms] = useState(filmsData);

  useEffect(() => {
    setSavedFilms(filmsData.filter((film) => film.isLiked));
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredFilms = filmsData.filter((film) => 
      film.name.toLowerCase().includes(query.toLowerCase())
    );
    setSavedFilms(filteredFilms);
  };

  const handleUnsave = (id) => {
    const updatedSavedMovies = savedFilms.filter((film) => film._id !== id);
    setSavedFilms(updatedSavedMovies);
  }

  return (
    <main className="saved-movies">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList films={savedFilms} isSaved={true} onDelete={handleUnsave} />
    </main>
  );
}
