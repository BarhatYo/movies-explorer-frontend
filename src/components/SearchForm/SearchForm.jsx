import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({ findMovies, isSaved, films }) {
  const [query, setQuery] = useState("");
  const [isShort, setIsShort] = useState(false);

  const handleChecked = () => {
    setIsShort(!isShort);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    findMovies(query, isShort);
  };

  useEffect(() => {
    if (isSaved) {
      return;
    }
    const lastSearchString = localStorage.getItem("lastSearch");
    if (lastSearchString) {
      const lastSearch = JSON.parse(lastSearchString);
      findMovies(lastSearch.query, lastSearch.isShort);
      setQuery(lastSearch.query);
      setIsShort(lastSearch.isShort);
    }
  }, [films]);

  return (
    <>
      <form className="search-form" name="search" onSubmit={handleSubmit}>
        <div className="search-form__search">
          <input
            className="search-form__input"
            placeholder="Фильм"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            name="search-input"
            required
          />
          <button className="search-form__button">Найти</button>
        </div>
        <FilterCheckbox handleChecked={handleChecked} isShort={isShort} />
      </form>
    </>
  );
}
