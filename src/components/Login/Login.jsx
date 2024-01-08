import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";
import * as mainApi from "../../utils/MainApi";

export default function Login({ setIsLoggedIn, handleOpenPopup }) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        handleOpenPopup({ title: "Авторизация успешна", buttonText: "Супер!" });
        navigate("/movies", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        if (error.includes("401")) {
          setErrorMessage("Вы ввели неправильный логин или пароль.");
        } else {
          setErrorMessage(
            "При авторизации произошла ошибка. Переданный токен некорректен."
          );
        }
      })
      .finally(() => setIsButtonDisabled(false));
  };

  useEffect(() => {
    resetForm({}, {}, false);
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
        <form
          className="login__form"
          name="login__form"
          onSubmit={handleLogin}
          noValidate
        >
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
            <span
              className={`login__error ${isError ? "login__error_active" : ""}`}
            >
              {errorMessage}
            </span>
            <button
              className={`login__button ${
                !isValid || isButtonDisabled ? "login__button_disabled" : ""
              }`}
              disabled={!isValid || isButtonDisabled}
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
    </main>
  );
}
