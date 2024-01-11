import React from "react";
import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import avatar from "../../images/Sergey Barkhatov.jpeg";
import linkIcon from "../../images/link-icon.svg";

export default function AboutMe() {
  return (
    <section className="about-me">
      <SectionTitle title={"Студент"} />
      <div className="about-me__profile">
        <div className="about-me__info">
          <h2 className="about-me__name">Сергей</h2>
          <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__details">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__github-link"
            href="https://github.com/BarhatYo"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Аватар" />
      </div>
      <div className="about-me__portfolio">
        <h4 className="about-me__portfolio-title">Портфолио</h4>
        <ul className="about-me__portfolio-items">
          <li className="about-me__portfolio-item">
            <a
              className="about-me__portfolio-item-link"
              href="https://barhatyo.github.io/how-to-learn/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="about-me__portfolio-link">Статичный сайт</span>
              <img
                className="about-me__portfolio-icon"
                src={linkIcon}
                alt="Иконка ссылки"
              />
            </a>
          </li>
          <li className="about-me__portfolio-item">
            <a
              className="about-me__portfolio-item-link"
              href="https://barhatyo.github.io/russian-travel"
              target="_blank"
              rel="noreferrer"
            >
              <span className="about-me__portfolio-link">Адаптивный сайт</span>
              <img
                className="about-me__portfolio-icon"
                src={linkIcon}
                alt="Иконка ссылки"
              />
            </a>
          </li>
          <li className="about-me__portfolio-item">
            <a
              className="about-me__portfolio-item-link"
              href="https://barkhatos.nomoredomainsicu.ru/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="about-me__portfolio-link">
                Одностраничное приложение
              </span>
              <img
                className="about-me__portfolio-icon"
                src={linkIcon}
                alt="Иконка ссылки"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
