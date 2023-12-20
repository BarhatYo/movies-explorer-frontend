import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/", { replace: true });
  };

  return (
    // Тексты ошибок будет обновлены на следующем этапе после настройки логики регистрации/авторизации
    <div className="login">
      <div className="login__content">
        <div className="login__hello">
          <img
            className="login__logo"
            src={logo}
            alt="Логотип"
            onClick={goToMain}
          />
          <h2 className="login__title">Рады видеть!</h2>
        </div>
        <form className="login__form" name="login__form" noValidate>
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
            required
          />
          <span className="login__input-error">Текст ошибки</span>
          <div className="login__action">
            <button className="login__button">Войти</button>
            <div className="login__not-registred">
              <p className="login__not-registred-text">
                Ещё не зарегистрированы?
              </p>
              <Link to="/signup" className="login__register-link" href=" ">
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
