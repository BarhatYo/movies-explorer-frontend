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
        <div className="techs__items">
          <p className="techs__item">HTML</p>
          <p className="techs__item">CSS</p>
          <p className="techs__item">JS</p>
          <p className="techs__item">React</p>
          <p className="techs__item">Git</p>
          <p className="techs__item">Express.js</p>
          <p className="techs__item">mongoDB</p>
        </div>
      </div>
    </section>
  );
}
