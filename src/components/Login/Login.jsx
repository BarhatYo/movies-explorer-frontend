import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

export default function Login({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleLogin,
}) {
  
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/", { replace: true });
  };

  return (
    // Тексты ошибок будет обновлены на следующем этапе после настройки логики регистрации/авторизации
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
            value={email}
            onChange={handleEmailChange}
            minLength="2"
            placeholder="Введите email"
            required
          />
          <span className="login__input-error">Текст ошибки</span>
          <label className="login__input-label" htmlFor="password">
            Пароль
          </label>
          <input
            className="login__input"
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            minLength="4"
            placeholder="Введите пароль"
            required
          />
          <span className="login__input-error">Текст ошибки</span>
          <div className="login__action">
            <button className="login__button">Войти</button>
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
