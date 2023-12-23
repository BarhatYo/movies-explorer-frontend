import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(true);

  const [name, setName] = useState("Сергей");
  const [email, setEmail] = useState("sergeybarkhat@gmail.com");

  const handleForm = () => {
    setIsEdit(!isEdit);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="profile">
      <h1 className="profile__hello">Привет, Виталий!</h1>
      {isEdit ? (
        <>
          <div className="profile__info">
            <div className="profile__name">
              <p className="profile__name-title">Имя</p>
              <p className="profile__name-text">{name}</p>
            </div>
            <div className="profile__email">
              <p className="profile__email-title">E-mail</p>
              <p className="profile__email-text">{email}</p>
            </div>
          </div>
          <div className="profile__actions">
            <button
              className="profile__edit-button"
              onClick={handleForm}
              type="button"
            >
              Редактировать
            </button>
            <Link to="/" className="profile__exit-button">
              Выйти из аккаунта
            </Link>
          </div>
        </>
      ) : (
        <form
          className="profile__form"
          name="profile-form"
          onSubmit={handleSubmit}
        >
          <div className="profile__form-name-field">
            <label className="profile__form-name-label">Имя</label>
            <input
              className="profile__form-name-input"
              value={name}
              name="name"
              onChange={handleNameChange}
              minLength="2"
              maxLength="30"
              placeholder="Введите имя"
            />
          </div>
          <div className="profile__form-email-field">
            <label className="profile__form-email-label">E-mail</label>
            <input
              className="profile__form-email-input"
              value={email}
              name="email"
              onChange={handleEmailChange}
              minLength="2"
              placeholder="Введите email"
            />
          </div>
          <div className="profile__save">
            <span className="profile__form-error">
              При обновлении профиля произошла ошибка.
            </span>
            <button
              className="profile__form-save-button"
            >
              Сохранить
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
