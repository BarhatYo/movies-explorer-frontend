import React from "react";
import "./FilterCheckbox.css";

export default function FilterCheckbox({ isShort, setIsShort, isSaved }) {
  const handleCheckBox = () => {
    setIsShort(!isShort);
    if (!isSaved) {
      localStorage.setItem("isShort", !isShort);
    }
  };

  return (
    <label className="filter-checkbox" htmlFor="checkbox-input">
      <input
        className="filter-checkbox__input"
        name="checkbox-input"
        id="checkbox-input"
        type="checkbox"
        onChange={handleCheckBox}
        checked={isShort}
      />
      <span className="filter-checkbox__icon" />
      <span className="filter-checkbox__text">Короткометражки</span>
    </label>
  );
}
