import React from "react";
import "./Techs.css";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__content">
        <SectionTitle title={"Технологии"} />
        <h2 className="techs__title">7 технологий</h2>
        <h4 className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </h4>
        <ul className="techs__items">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
