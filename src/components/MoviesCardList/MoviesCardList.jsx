import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ films, isSaved, onDelete }) {
  const [visibleCards, setVisibleCards] = useState(16);
  const [loadMore, setLoadMore] = useState(films.length > visibleCards);
  const [cardsPerPage, setCardsPerPage] = useState(16);

  const filmsToShow = films.slice(0, visibleCards);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setCardsPerPage(16);
      } else if (width > 576 && width <= 992) {
        setCardsPerPage(8);
      } else if (width <= 576) {
        setCardsPerPage(5);
      }
      setVisibleCards(cardsPerPage);
      setLoadMore(cardsPerPage < films.length);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cardsPerPage, films.length]);

  const handleShowMore = () => {
    const newVisibleCards = visibleCards + cardsPerPage;
    setVisibleCards(newVisibleCards);
    setLoadMore(newVisibleCards < films.length);
  };

  return (
    <>
      <div className="movies-card-list">
        {filmsToShow.map((film) => (
          <MoviesCard
            image={film.image}
            duration={film.duration}
            name={film.name}
            isLiked={film.isLiked}
            isSaved={isSaved}
            key={film._id}
            onDelete={onDelete}
            filmId={film._id}
          />
        ))}
      </div>
      {loadMore && (
        <button className="movies-card-list__more" onClick={handleShowMore}>
          Ещё
        </button>
      )}
    </>
  );
}
