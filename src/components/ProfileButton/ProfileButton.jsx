import React from "react";
import "./ProfileButton.css";
import { Link, useLocation } from "react-router-dom";

export default function ProfileButton({ isMobile }) {
  const location = useLocation();

  return location.pathname === "/" ? (
    <Link
      to="/profile"
      className={`profile-button profile-button_page_main ${isMobile ? "profile-button_active" : ''}`}
    >
      <span className="profile-button__username">Аккаунт</span>
      <div className="profile-button__icon" />
    </Link>
  ) : (
    <Link
      to="/profile"
      className={`profile-button ${isMobile ? "profile-button_active" : ''}`}
    >
      <span className="profile-button__username">Аккаунт</span>
      <div className="profile-button__icon" />
    </Link>
  );
}
