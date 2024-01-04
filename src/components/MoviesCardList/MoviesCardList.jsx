import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  movies,
  isSavedMovies,
  onDelete,
  updateMoviesAfterLike,
  isShort,
  isNothingFound,
  setIsNothingFound,
  isSearch
}) {
  const [visibleCards, setVisibleCards] = useState(undefined);
  const [loadMore, setLoadMore] = useState(undefined);
  const [cardsPerPage, setCardsPerPage] = useState(undefined);

  const filteredMovies = isShort
    ? movies.filter((movie) => movie.duration < 40)
    : movies;

  useEffect(() => {
    if (isShort && isSearch) {
      setIsNothingFound(isShort && filteredMovies.length === 0);
    } else if (isSearch) {
      setIsNothingFound(filteredMovies.length === 0);
    }
  }, [isSearch, isShort, filteredMovies.length]);

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

      setVisibleCards(cardsPerPage);
      setLoadMore(cardsPerPage < filteredMovies.length);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cardsPerPage, filteredMovies.length, isSavedMovies]);

  const handleShowMore = () => {
    const newVisibleCards = visibleCards + cardsPerPage;
    setVisibleCards(newVisibleCards);
    setLoadMore(newVisibleCards < filteredMovies.length);
  };

  return (
    <>
      {isNothingFound ? (
        <div className="movies-card-list__nothing">Ничего не найдено</div>
      ) : (
        <>
          <ul className="movies-card-list">
            {filteredMovies.slice(0, visibleCards).map((movie) => (
              <li
                className="movies-card-list__item"
                key={isSavedMovies ? movie._id : movie.id}
              >
                {isSavedMovies ? (
                  <MoviesCard
                    _id={movie._id}
                    movieId={movie.id}
                    nameRU={movie.nameRU}
                    nameEN={movie.nameEN}
                    director={movie.director}
                    country={movie.country}
                    year={movie.year}
                    duration={movie.duration}
                    description={movie.description}
                    trailerLink={movie.trailerLink}
                    thumbNail={movie.thumbNail}
                    image={movie.image}
                    isLiked={movie.isLiked}
                    isSavedMovies={isSavedMovies}
                    onDelete={onDelete}
                  />
                ) : (
                  <MoviesCard
                    _id={movie._id}
                    movieId={movie.id}
                    nameRU={movie.nameRU}
                    nameEN={movie.nameEN}
                    director={movie.director}
                    country={movie.country}
                    year={movie.year}
                    duration={movie.duration}
                    description={movie.description}
                    trailerLink={movie.trailerLink}
                    thumbNail={
                      "https://api.nomoreparties.co" +
                      movie.image.formats.thumbnail.url
                    }
                    image={"https://api.nomoreparties.co" + movie.image.url}
                    isLiked={movie.isLiked}
                    isSavedMovies={isSavedMovies}
                    updateMoviesAfterLike={updateMoviesAfterLike}
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
      )}
    </>
  );
}
