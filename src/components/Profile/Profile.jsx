import React, { useState } from "react";
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
    e.prevent.default();
  };

  return (
    <div className="profile">
      <h2 className="profile__hello">Привет, Виталий!</h2>
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
            <button className="profile__edit-button" onClick={handleForm}>
              Редактировать
            </button>
            <button className="profile__exit-button">Выйти из аккаунта</button>
          </div>
        </>
      ) : (
        <form className="profile__form" onSubmit={handleForm}>
          <div className="profile__form-name-field">
            <label className="profile__form-name-label">Имя</label>
            <input
              className="profile__form-name-input"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="profile__form-email-field">
            <label className="profile__form-email-label">Email</label>
            <input
              className="profile__form-email-input"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="profile__save">
            <span className="profile__form-error">
              При обновлении профиля произошла ошибка.
            </span>
            <button
              className="profile__form-save-button"
              onSubmit={handleSubmit}
            >
              Сохранить
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
