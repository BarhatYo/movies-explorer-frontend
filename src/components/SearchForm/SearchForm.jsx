import React from "react";
import "./SearchForm.css";

export default function SearchForm({ handleSearch }) {
  return (
    <form className="search-form">
      <input className="search-form__input" placeholder="Фильм" onChange={(e) => handleSearch(e.target.value)} />
      <button className="search-form__button">Найти</button>
    </form>
  );
}
