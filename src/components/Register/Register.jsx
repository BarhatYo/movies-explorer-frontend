import React, { useState, useEffect } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation.js";
import * as mainApi from "../../utils/MainApi";
import InfoPopup from "../InfoPopup/InfoPopup";

export default function Register({ setCurrentUser, setIsLoggedIn }) {
  const [isPopup, setIsPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/", { replace: true });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    mainApi
      .register(values.name, values.email, values.password)
      .then(() => {
        return mainApi.login(values.email, values.password);
      })
      .then(() => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        setIsPopup(true);
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 409) {
          setErrorMessage("Пользователь с таким email уже существует.");
        }
        setIsError(true);
        setErrorMessage("При регистрации пользователя произошла ошибка.");
      })
      .finally(() => setIsButtonDisabled(false));
  };

  const handleClosePopup = () => {
    setIsPopup(false);
    navigate("/movies", { replace: true });
  };

  useEffect(() => {
    resetForm({}, {}, true);
  }, [resetForm]);

  return (
    <main className="register">
      <div className="register__content">
        <div className="register__hello">
          <img
            className="register__logo"
            src={logo}
            alt="Логотип"
            onClick={goToMain}
          />
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form
          className="register__form"
          name="register__form"
          onSubmit={handleRegister}
          noValidate
        >
          <label className="register__input-label" htmlFor="name">
            Имя
          </label>
          <input
            className="register__input"
            name="name"
            id="name"
            value={values.name || ""}
            onChange={handleChange}
            minLength="2"
            maxLength="50"
            placeholder="Введите имя"
            required
          />
          <span className="register__input-error">{errors.name}</span>
          <label className="register__input-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="register__input"
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
          <span className="register__input-error">{errors.email}</span>
          <label className="register__input-label" htmlFor="password">
            Пароль
          </label>
          <input
            className="register__input"
            name="password"
            type="password"
            id="password"
            value={values.password || ""}
            minLength="4"
            placeholder="Введите пароль"
            onChange={handleChange}
            required
          />
          <span className="register__input-error">{errors.password}</span>
          <div className="register__action">
            <span
              className={`register__error ${
                isError ? "register__error_active" : ""
              }`}
            >
              {errorMessage}
            </span>
            <button
              className={`register__button ${
                !isValid ? "register__button_disabled" : ""
              }`}
              disabled={isButtonDisabled}
            >
              Зарегистрироваться
            </button>
            <div className="register__registred">
              <p className="register__registred-text">Уже зарегистрированы?</p>
              <Link to="/signin" className="register__login-link">
                Войти
              </Link>
            </div>
          </div>
        </form>
      </div>
      {isPopup && (
        <InfoPopup
          title={"Регистрация успешна"}
          buttonText={"Отлично!"}
          onClick={handleClosePopup}
        />
      )}
    </main>
  );
}
