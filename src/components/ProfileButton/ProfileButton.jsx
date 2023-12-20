import React from "react";
import "./ProfileButton.css";
import { Link, useLocation } from "react-router-dom";
import profileButton from '../../images/profile_authorized.png';

export default function ProfileButton({ isMobile }) {
  const location = useLocation();

  return location.pathname === "/" ? (
    <Link
      to="/profile"
      className={`profile-button ${isMobile && "profile-button_active"} profile-button__main-page`}
    >
      <img className="profile-button__main-page-image" src={profileButton} alt="Иконка профиля"></img>
    </Link>
  ) : (
    <Link
      to="/profile"
      className={`profile-button ${isMobile && "profile-button_active"}`}
    >
      <p className="profile-button__username">Аккаунт</p>
      <div className="profile-button__icon" />
    </Link>
  );
}
