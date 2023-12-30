import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  films,
  isSavedMovies,
  onDelete,
  getAllMovies,
}) {
  const [visibleCards, setVisibleCards] = useState(undefined);
  const [loadMore, setLoadMore] = useState(films.length > visibleCards);
  const [cardsPerPage, setCardsPerPage] = useState(undefined);

  const filmsToShow = films.slice(0, visibleCards);

  useEffect(() => {
    if (isSavedMovies) {
      return;
    }
    setVisibleCards(16);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 992) {
        setCardsPerPage(16);
      } else if (width > 576 && width <= 992) {
        setCardsPerPage(8);
      } else if (width <= 576) {
        setCardsPerPage(5);
      }

      setTimeout(() => {
        setVisibleCards(cardsPerPage);
        setLoadMore(cardsPerPage < films.length);
      }, 1000);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cardsPerPage, films.length, isSavedMovies]);

  const handleShowMore = () => {
    const newVisibleCards = visibleCards + cardsPerPage;
    setVisibleCards(newVisibleCards);
    setLoadMore(newVisibleCards < films.length);
  };

  return (
    <>
      <ul className="movies-card-list">
        {filmsToShow.map((film) => (
          <li
            className="movies-card-list__item"
            key={isSavedMovies ? film._id : film.id}
          >
            {isSavedMovies ? (
              <MoviesCard
                _id={film._id}
                movieId={film.id}
                nameRU={film.nameRU}
                nameEN={film.nameEN}
                director={film.director}
                country={film.country}
                year={film.year}
                duration={film.duration}
                description={film.description}
                trailerLink={film.trailerLink}
                thumbNail={film.thumbNail}
                image={film.image}
                isLiked={film.isLiked}
                isSavedMovies={isSavedMovies}
                onDelete={onDelete}
              />
            ) : (
              <MoviesCard
                _id={film._id}
                movieId={film.id}
                nameRU={film.nameRU}
                nameEN={film.nameEN}
                director={film.director}
                country={film.country}
                year={film.year}
                duration={film.duration}
                description={film.description}
                trailerLink={film.trailerLink}
                thumbNail={
                  "https://api.nomoreparties.co" +
                  film.image.formats.thumbnail.url
                }
                image={"https://api.nomoreparties.co" + film.image.url}
                isLiked={film.isLiked}
                isSavedMovies={isSavedMovies}
                getAllMovies={getAllMovies}
              />
            )}
          </li>
        ))}
      </ul>
      {loadMore && (
        <button
          className="movies-more-button"
          onClick={handleShowMore}
          type="button"
        >
          Ещё
        </button>
      )}
    </>
  );
}
