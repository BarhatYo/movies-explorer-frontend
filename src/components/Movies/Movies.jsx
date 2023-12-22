import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import filmsData from "../../constants/films.js";

export default function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [films, setFilms] = useState(filmsData);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredFilms = filmsData.filter((film) =>
      film.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilms(filteredFilms);
  };

  return (
    <main className="movies">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList films={films} isSaved={false} />
    </main>
  );
}
