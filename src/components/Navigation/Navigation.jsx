import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({
  isMobile,
  handleMobileMenuClick,
  isAuthorized,
}) {

  return (
    <nav
      className={`navigation ${isMobile ? "navigation_active" : ''} ${
        isAuthorized ? "navigation_authorized" : ''
      }`}
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          `navigation__link navigation__link_hidden ${
            isActive ? "navigation__link_active" : ""
          } ${isAuthorized ? "navigation__link_authorized" : ''}`
        }
        onClick={handleMobileMenuClick}
      >
        Главная
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""} ${
            isAuthorized ? "navigation__link_authorized" : ''
          }`
        }
        onClick={handleMobileMenuClick}
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={({ isActive }) =>
          `navigation__link ${isActive ? "navigation__link_active" : ""} ${
            isAuthorized ? "navigation__link_authorized" : ''
          }`
        }
        onClick={handleMobileMenuClick}
      >
        Сохранённые фильмы
      </NavLink>
    </nav>
  );
}
