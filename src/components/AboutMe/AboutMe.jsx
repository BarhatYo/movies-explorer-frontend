import React from "react";
import "./AboutMe.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import avatar from "../../images/author.jpg";
import linkIcon from '../../images/link-icon.jpg';

export default function AboutMe() {
  return (
    <div className="about-me">
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
          <a className="about-me__github-link" href='https://github.com/BarhatYo' target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <img className="about-me__avatar" src={avatar} alt="Аватар" />
      </div>
      <div className="about-me__portfolio">
        <h4 className="about-me__portfolio-title">Портфолио</h4>
        <div className="about-me__portfolio-item">
          <a className="about-me__portfolio-link" href='https://barhatyo.github.io/how-to-learn/' target="_blank" rel="noreferrer">Статичный сайт</a>
          <a className="about-me__portfolio-icon" href='https://barhatyo.github.io/how-to-learn/' target="_blank" rel="noreferrer"><img className="about-me__portfolio-img" src={linkIcon} alt="Иконка ссылки"/></a>
        </div>
        <div className="about-me__portfolio-item">
          <a className="about-me__portfolio-link" href='https://barhatyo.github.io/russian-travel' target="_blank" rel="noreferrer">Адаптивный сайт</a>
          <a className="about-me__portfolio-icon" href='https://github.com/russian-travel' target="_blank" rel="noreferrer"><img className="about-me__portfolio-img" src={linkIcon} alt="Иконка ссылки"/></a>
        </div>
        <div className="about-me__portfolio-item">
          <a className="about-me__portfolio-link" href='https://barkhatos.nomoredomainsicu.ru/' target="_blank" rel="noreferrer">Одностраничное приложение</a>
          <a className="about-me__portfolio-icon" href='https://barkhatos.nomoredomainsicu.ru/' target="_blank" rel="noreferrer"><img className="about-me__portfolio-img" src={linkIcon} alt="Иконка ссылки"/></a>
        </div>
      </div>
    </div>
  );
}
