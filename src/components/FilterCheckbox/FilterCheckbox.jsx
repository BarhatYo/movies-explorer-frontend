import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox() {
  return (
    <form className="filter-checkbox">
      <label className="filter-checkbox__label" htmlFor="checkbox-input">
        <input
          className="filter-checkbox__input"
          name="checkbox-input"
          id="checkbox-input"
          type="checkbox"
        />
        <span className="filter-checkbox__icon" />
        <p className="filter-checkbox__label-text">Короткометражки</p>
      </label>
    </form>
  );
}
