import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({
  findMovies,
  isSaved,
  isShort,
  setIsShort,
}) {
  const [query, setQuery] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!query || !query.trim()) {
      setInputError(true);
    } else {
      setInputError(false);
      findMovies(query.trim());
    }
  };
  

  useEffect(() => {
    if (isSaved) {
      return;
    }
    const lastSearch = localStorage.getItem("lastSearch");
    setQuery(lastSearch);
  }, []);

  return (
    <>
      <form
        className="search-form"
        name="search"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-form__search">
          <input
            className={`search-form__input ${
              inputError ? "search-form__input_error" : ""
            }`}
            placeholder="Фильм"
            onChange={(e) => {
              setInputError(false);
              setQuery(e.target.value);
            }}
            value={query || ""}
            name="search-input"
            minLength="1"
            required
          />
          <button className="search-form__button">Найти</button>
        </div>
        {inputError && (
          <span className="search-form__error-text">
            Введите ключевое слово
          </span>
        )}
        <FilterCheckbox isShort={isShort} setIsShort={setIsShort} />
      </form>
    </>
  );
}
