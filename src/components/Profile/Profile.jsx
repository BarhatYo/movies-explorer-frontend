import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import * as mainApi from "../../utils/MainApi";
import useFormValidation from "../../hooks/useFormValidation.js";

export default function Profile({ setCurrentUser, setIsLoggedIn }) {
  const [isEdit, setIsEdit] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  const currentUser = useContext(CurrentUserContext);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    setIsError(false);
  }, [values]);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const handleSubmit = (e) => {
    setIsButtonDisabled(true);
    e.preventDefault();
    mainApi
      .updateProfile(values.name, values.email)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        localStorage.setItem("currentUser", JSON.stringify(newUserInfo));
        setIsEdit(!isEdit);
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
        if (error.includes("409")) {
          setErrorMessage("Пользователь с таким email уже существует");
        } else {
          setErrorMessage("При обновлении профиля произошла ошибка.");
        }
      })
      .finally(() => setIsButtonDisabled(false));
  };

  const handleExit = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  const navigate = useNavigate();

  return (
    <main className="profile">
      <h1 className="profile__hello">Привет, {currentUser.name}!</h1>
      {isEdit ? (
        <>
          <div className="profile__info">
            <div className="profile__name">
              <p className="profile__name-title">Имя</p>
              <p className="profile__name-text">
                {values.name || currentUser.name}
              </p>
            </div>
            <div className="profile__email">
              <p className="profile__email-title">E-mail</p>
              <p className="profile__email-text">
                {values.email || currentUser.email}
              </p>
            </div>
          </div>
          <div className="profile__actions">
            <button
              className="profile__edit-button"
              onClick={handleEdit}
              type="button"
            >
              Редактировать
            </button>
            <button
              className="profile__exit-button"
              type="button"
              onClick={handleExit}
            >
              Выйти из аккаунта
            </button>
          </div>
        </>
      ) : (
        <form
          className="profile__form"
          name="profile-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="profile__form-name-field">
            <div className="profile__form-name-container">
              <label className="profile__form-name-label">Имя</label>
              <input
                className="profile__form-name-input"
                value={values.name || ""}
                name="name"
                onChange={handleChange}
                minLength="2"
                maxLength="30"
                placeholder="Введите имя"
              />
            </div>
            <span className="profile__form-name-input-error">
              {errors.name}
            </span>
          </div>
          <div className="profile__form-email-field">
            <div className="profile__form-email-container">
              <label className="profile__form-email-label">E-mail</label>
              <input
                className="profile__form-email-input"
                value={values.email || ""}
                name="email"
                type="email"
                onChange={handleChange}
                minLength="2"
                pattern="^\w+@\w+\.\w{2,}(\.\w{2,})*$"
                placeholder="Введите email"
              />
            </div>
            <span className="profile__form-name-input-error">
              {errors.email}
            </span>
          </div>
          <div className="profile__save">
            <span
              className={`profile__form-error ${
                !isError ? "profile__form-error_hidden" : ""
              }`}
            >
              {errorMessage}
            </span>
            <button
              className={`profile__form-save-button ${
                !isValid || isButtonDisabled
                  ? "profile__form-save-button_disabled"
                  : ""
              } `}
              disabled={!isValid || isButtonDisabled}
            >
              Сохранить
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
