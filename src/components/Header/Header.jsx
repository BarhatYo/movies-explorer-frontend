import Navigation from "../Navigation/Navigation";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import ProfileButton from "../ProfileButton/ProfileButton";
import AuthControls from "../AuthControls/AuthControls";
import BurgerButton from "../BurgerButton/BurgerButton";

export default function Header({
  isLoggedIn,
  isMobile,
  handleBurgerClick,
  handleMobileMenuClick,
}) {
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
        className={`header__overlay ${
          isMobile ? "header__overlay_active" : ""
        }`}
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
                isMobile ? "header__menu_mobile_active" : ""
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
              <ProfileButton
                isMobile={isMobile}
                handleMobileMenuClick={handleMobileMenuClick}
              />
            </div>
          </>
        ) : (
          <>
            {isLoggedIn ? (
              <div
                className={`header__menu  ${
                  isLoggedIn ? "header__menu_authorized" : ""
                } ${isMobile ? "header__menu_mobile_active" : ""}`}
              >
                <BurgerButton
                  isMobile={isMobile}
                  handleBurgerClick={handleBurgerClick}
                  isAuthorized={isLoggedIn}
                />
                <Navigation
                  isMobile={isMobile}
                  handleMobileMenuClick={handleMobileMenuClick}
                  isAuthorized={isLoggedIn}
                />
                <ProfileButton
                  isMobile={isMobile}
                  handleMobileMenuClick={handleMobileMenuClick}
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
