import React, { useEffect, useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import * as moviesSizes from '../../constants/moviesSizes';

export default function MoviesCardList({
  movies,
  isSavedMovies,
  isShort,
  searched,
  setSavedMovies,
  setFoundSavedMovies,
  isLoadingError,
  isNothingFound,
  setIsNothingFound
}) {
  const [visibleCards, setVisibleCards] = useState(undefined);
  const [loadMore, setLoadMore] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(0);  

  const filteredMovies = isShort
    ? movies.filter((movie) => movie.duration < moviesSizes.SHORT_MOVIE_DURATION)
    : movies;
  

  useEffect(() => {
    if (searched) {
      setIsNothingFound(filteredMovies.length === 0);
    } else if (isSavedMovies) {
      setIsNothingFound(filteredMovies.length === 0);
    }
  }, [searched, isSavedMovies, isShort, filteredMovies.length]);

  useEffect(() => {
    if (isSavedMovies) {
      return;
    }
    setVisibleCards(moviesSizes.MOVIES_AMOUNT_LARGE);
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > moviesSizes.DISPLAY_SIZE_MEDIUM) {
        setCardsPerPage(moviesSizes.MOVIES_AMOUNT_LARGE);
      } else if (width > moviesSizes.DISPLAY_SIZE_SMALL && width <= moviesSizes.DISPLAY_SIZE_MEDIUM) {
        setCardsPerPage(moviesSizes.MOVIES_AMOUNT_MEDIUM);
      } else if (width <= moviesSizes.DISPLAY_SIZE_SMALL) {
        setCardsPerPage(moviesSizes.MOVIES_AMOUNT_SMALL);
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
      {isLoadingError ? (
        <div className="movies-card-list__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </div>
      ) : isNothingFound ? (
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
                    setSavedMovies={setSavedMovies}
                    setFoundSavedMovies={setFoundSavedMovies}
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
                    setSavedMovies={setSavedMovies}
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
