import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox() {
  return (
    <label className="filter-checkbox" htmlFor="checkbox-input">
      <input
        className="filter-checkbox__input"
        name="checkbox-input"
        id="checkbox-input"
        type="checkbox"
      />
      <span className="filter-checkbox__icon" />
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}
