import React from "react";
import "./BurgerButton.css";

export default function BurgerButton({
  isMobile,
  handleBurgerClick,
  isAuthorized,
}) {
  return (
    <div
      className={`menu-burger ${isAuthorized ? "authorized" : ''} ${
        isMobile ? "menu-burger_active" : ''
      }`}
      onClick={handleBurgerClick}
    >
      <span
        className={`menu-burger__line ${
          isMobile ? "menu-burger__line_active" : ''
        } ${isAuthorized ? "menu-burger__line_authorized" : ''}`}
      ></span>
    </div>
  );
}
