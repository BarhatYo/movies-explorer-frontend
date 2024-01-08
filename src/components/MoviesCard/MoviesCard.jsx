import React, { useState } from "react";
import "./MoviesCard.css";
import likeIcon from "../../images/like.svg";
import likeInactiveIcon from "../../images/like_inactive.svg";
import cross from "../../images/cross.svg";
import * as mainApi from "../../utils/MainApi";

export default function MoviesCard({
  _id,
  movieId,
  nameRU,
  nameEN,
  director,
  country,
  year,
  duration,
  description,
  trailerLink,
  thumbNail,
  image,
  isLiked,
  isSavedMovies,
  setSavedMovies,
  setFoundSavedMovies,
}) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isHovered, setIsHovered] = useState(false);
  const [id, setId] = useState(_id);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLike = (movie) => {
    setIsButtonDisabled(true);
    mainApi
      .addMovie(movie)
      .then((movie) => {
        setId(movie._id);
        setSavedMovies((prevSavedMovies) => [...prevSavedMovies, movie]);
        setIsLikedState(true);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  const handleDislike = (id) => {
    setIsButtonDisabled(true);
    setSavedMovies((prevSavedMovies) =>
      prevSavedMovies.filter((movie) => movie._id !== id)
    );
    mainApi
      .removeSavedMovie(id)
      .catch((error) => console.log(error))
      .finally(() => {
        setIsButtonDisabled(false);
        setIsLikedState(false);
      });
  };

  const deleteSavedMovies = (id) => {
    setFoundSavedMovies((prevSavedMovies) =>
      prevSavedMovies.filter((movie) => movie._id !== id)
    );
    setSavedMovies((prevSavedMovies) =>
      prevSavedMovies.filter((movie) => movie._id !== id)
    );
    mainApi.removeSavedMovie(id).catch((err) => console.log(err));
  };

  return (
    <div
      className="movies-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        className="movies-card__image-wrapper"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img src={image} className="movies-card__image" alt={nameRU} />
      </a>
      <div className="movies-card__info">
        <h2 className="movies-card__name">{nameRU}</h2>
        {isSavedMovies ? (
          <button
            className={`movies-card__like ${
              !isHovered ? "movies-card__like_invisible" : ""
            }`}
            onClick={() => deleteSavedMovies(id)}
            type="button"
            disabled={isButtonDisabled}
          >
            <img className="movies-card__like-icon" src={cross} alt="Лайк" />
          </button>
        ) : (
          <button
            className="movies-card__like"
            onClick={() =>
              isLikedState
                ? handleDislike(id)
                : handleLike({
                    movieId,
                    nameRU,
                    nameEN,
                    director,
                    country,
                    year,
                    duration,
                    description,
                    trailerLink,
                    thumbNail,
                    image,
                  })
            }
            type="button"
            disabled={isButtonDisabled}
          >
            <img
              className="movies-card__like-icon"
              src={isLikedState ? likeIcon : likeInactiveIcon}
              alt="Лайк"
            />
          </button>
        )}
      </div>
      <p className="movies-card__duration">{`${Math.floor(duration / 60)}ч ${
        duration % 60
      }м`}</p>
    </div>
  );
}
