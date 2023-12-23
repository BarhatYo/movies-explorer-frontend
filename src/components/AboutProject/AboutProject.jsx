import React from "react";
import "./AboutProject.css";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function AboutProject() {
  return (
    <section className="about">
      <SectionTitle title={"О проекте"} />
      <div className="about__info">
        <div className="about__info-item">
          <h3 className="about__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__info-description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__info-item">
          <h3 className="about__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__info-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__roadmap">
        <div className="about__backend">
          <p className="about__week about__week_color_green">1 неделя</p>
          <p className="about__dev">Back-end</p>
        </div>
        <div className="about__frontend">
          <p className="about__week">4 недели</p>
          <p className="about__dev">Front-end</p>
        </div>
      </div>
    </section>
  );
}
