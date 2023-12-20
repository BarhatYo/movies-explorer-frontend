import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="not-found">
      <div className="not-found__info">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__message">Страница не найдена</p>
      </div>
      <button className="not-found__button-back" onClick={goBack}>
        Назад
      </button>
    </div>
  );
}
