import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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
    <div className="register">
      <div className="register__content">
        <div className="register__hello">
          <img
            className="register__logo"
            src={logo}
            alt="Логотип"
            onClick={goToMain}
          />
          <h2 className="register__title">Добро пожаловать!</h2>
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
            value={name}
            onChange={handleNameChange}
            required
          />
          <span className="register__input-error">Текст ошибки</span>
          <label className="register__input-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="register__input"
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <span className="register__input-error">Текст ошибки</span>
          <label className="register__input-label" htmlFor="password">
            Пароль
          </label>
          <input
            className="register__input"
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span className="register__input-error">Текст ошибки</span>
          <div className="register__action">
            <button className="register__button">Зарегистрироваться</button>
            <div className="register__registred">
              <p className="register__registred-text">Уже зарегистрированы?</p>
              <Link to="/signin" className="register__login-link">
                Войти
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
