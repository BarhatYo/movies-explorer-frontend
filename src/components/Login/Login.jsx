import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";
import * as mainApi from "../../utils/MainApi";
import InfoPopup from "../InfoPopup/InfoPopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

export default function Login({ setIsLoggedIn, setCurrentUser }) {
  const [isInfoPopup, setIsInfoPopup] = useState(false);
  const [isErrorPopup, setIsErrorPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/", { replace: true });
  };

  const handleLogin = (e) => {
    setIsButtonDisabled(true);
    e.preventDefault();
    mainApi
      .login(values.email, values.password)
      .then(() => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        mainApi
          .getProfile()
          .then((currentUserInfo) => {
            setCurrentUser(currentUserInfo);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(currentUserInfo)
            );
            setIsInfoPopup(true);
          })
          .catch((error) => console.log(error));
      })
      .catch(error => {
        console.log(error);
        setIsErrorPopup(true);
      })
      .finally(() => setIsButtonDisabled(false))
  };

  const handleCloseInfoPopup = () => {
    setIsInfoPopup(false);
    navigate("/movies", { replace: true });
  };

  const handleCloseErrorPopup = () => {
    setIsErrorPopup(false);
  };

  useEffect(() => {
    resetForm({}, {}, true);
  }, [resetForm]);

  return (
    <main className="login">
      <div className="login__content">
        <div className="login__hello">
          <img
            className="login__logo"
            src={logo}
            alt="Логотип"
            onClick={goToMain}
          />
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <form className="login__form" name="login__form" onSubmit={handleLogin}>
          <label className="login__input-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="login__input"
            name="email"
            type="email"
            id="email"
            value={values.email || ""}
            onChange={handleChange}
            minLength="2"
            placeholder="Введите email"
            pattern="^\w+@\w+\.\w{2,}(\.\w{2,})*$"
            required
          />
          <span className="login__input-error">{errors.email}</span>
          <label className="login__input-label" htmlFor="password">
            Пароль
          </label>
          <input
            className="login__input"
            name="password"
            type="password"
            id="password"
            value={values.password || ""}
            onChange={handleChange}
            minLength="4"
            placeholder="Введите пароль"
            required
          />
          <span className="login__input-error">{errors.password}</span>
          <div className="login__action">
            <button
              className={`login__button ${
                !isValid ? "login__button_disabled" : ""
              }`} disabled={isButtonDisabled}
            >
              Войти
            </button>
            <div className="login__not-registred">
              <p className="login__not-registred-text">
                Ещё не зарегистрированы?
              </p>
              <Link to="/signup" className="login__register-link">
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </div>
      {isInfoPopup && (
        <InfoPopup
          title={"Авторизация успешна"}
          buttonText={"Супер"}
          onClick={handleCloseInfoPopup}
        />
      )}
      {isErrorPopup && <ErrorPopup title={"Неправильный логин или пароль"} buttonText={"Закрыть"} onClick={handleCloseErrorPopup} /> }
    </main>
  );
}
