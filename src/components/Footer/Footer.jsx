import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <h4 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className="footer__info">
        <p className="footer__date">&#169; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li className="footer__link-item">
            <a
              className="footer__link"
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__link-item">
            <a
              className="footer__link"
              href="https://github.com/BarhatYo"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
