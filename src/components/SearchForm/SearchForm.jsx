import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function SearchForm({ handleSearch }) {
  return (
    <>
      <form className="search-form" name='search'>
        <div  className="search-form__search">
          <input
            className="search-form__input"
            placeholder="Фильм"
            onChange={(e) => handleSearch(e.target.value)}
            name="search-input"
            required
          />
          <button className="search-form__button">Найти</button>
        </div>
        <FilterCheckbox />
      </form>
    </>
  );
}
