import Navigation from "../Navigation/Navigation";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import ProfileButton from "../ProfileButton/ProfileButton";
import AuthControls from "../AuthControls/AuthControls";
import BurgerButton from "../BurgerButton/BurgerButton";

export default function Header({
  isMobile,
  handleBurgerClick,
  handleLogin,
  handleMobileMenuClick,
}) {
  const [isAuthorized, setIsAuthorized] = useState(true); //надо поменять на false, чтобы увидеть неавторизованной главную страницу

  const handeLogin = () => { //пока не используется
    setIsAuthorized(true);
  };

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/", { replace: true });
  };

  const location = useLocation();

  return (
    <header
      className={`header ${
        location.pathname !== "/" ? "header_authorized" : ""
      }`}
    >
      <div
        className={`header__overlay ${isMobile ? "header__overlay_active" : ''}`}
      ></div>
      <div className="header__content">
        <img
          className="header__logo"
          alt="Логотип"
          src={logo}
          onClick={goToMain}
        />
        {location.pathname !== "/" ? (
          <>
            <div
              className={`header__menu ${
                isMobile ? "header__menu-mobile_active" : ''
              }`}
            >
              <BurgerButton
                isMobile={isMobile}
                handleBurgerClick={handleBurgerClick}
              />
              <Navigation
                isMobile={isMobile}
                handleMobileMenuClick={handleMobileMenuClick}
              />
              <ProfileButton isMobile={isMobile} />
            </div>
          </>
        ) : (
          <>
            {isAuthorized ? (
              <div
                className={`header__menu ${
                  isMobile ? "header__menu-mobile_active" : ''
                } ${isAuthorized ? 'header__menu_authorized' : ''}`}
              >
                <BurgerButton
                  isMobile={isMobile}
                  handleBurgerClick={handleBurgerClick}
                  isAuthorized={isAuthorized}
                />
                <Navigation
                  isMobile={isMobile}
                  handleMobileMenuClick={handleMobileMenuClick}
                  isAuthorized={isAuthorized}
                />
                <ProfileButton
                  isMobile={isMobile}
                />
              </div>
            ) : (
              <AuthControls />
            )}
          </>
        )}
      </div>
    </header>
  );
}
