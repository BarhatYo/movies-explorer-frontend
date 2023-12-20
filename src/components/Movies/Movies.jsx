import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
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
    <div className="movies">
      <SearchForm handleSearch={handleSearch} />
      <FilterCheckbox />
      <MoviesCardList films={films} isSaved={false} />
    </div>
  );
}
