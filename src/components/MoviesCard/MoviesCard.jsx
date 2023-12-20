import React, { useState, useEffect } from "react";
import "./MoviesCard.css";
import likeIcon from "../../images/like.svg";
import likeInactiveIcon from "../../images/like_inactive.svg";
import cross from "../../images/cross.svg";

export default function MoviesCard({
  image,
  name,
  isLiked,
  duration,
  isSaved,
  filmId,
  onDelete,
}) {
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleUnsave = () => {
    onDelete(filmId);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLike = () => {
    setIsLikedState(!isLikedState);
  };

  return (
    <div className="movies-card">
      <img src={image} className="movies-card__image" alt={name} />
      <div className="movies-card__info">
        <p className="movies-card__name">{name}</p>
        {isSaved ? (
          <button
            className="movie-card__like"
            onClick={handleUnsave}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="movies-card__like-icon"
              src={isHovered ? cross : likeIcon}
              alt="Лайк"
            />
          </button>
        ) : (
          <button className="movie-card__like" onClick={handleLike}>
            <img
              className="movies-card__like-icon"
              src={isLikedState ? likeIcon : likeInactiveIcon}
              alt="Лайк"
            />
          </button>
        )}
      </div>
      <p className="movies-card__duration">{duration}</p>
    </div>
  );
}
