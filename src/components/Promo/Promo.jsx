import React from "react";
import "./Promo.css";
import promoLogo from "../../images/promo-logo.svg";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <div className="promo__info">
          <div className="promo__text">
            <h1 className="promo__title">
              Учебный проект студента факультета Веб&#8209;разработки.
            </h1>
            <h3 className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его
              создателя.
            </h3>
          </div>
          <img className="promo__image" src={promoLogo} alt="Промо логотип" />
        </div>
        <button
          className="promo__more"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            const aboutElement = document.querySelector(".about");
            aboutElement.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Узнать больше
        </button>
      </div>
    </section>
  );
}
