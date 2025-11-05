import { useState } from "react";
import "./index.scss";
import { FaImage, FaStar } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, onCardClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const rating = movie.vote_average.toFixed(1);

  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    console.log("Favorito?", !isFavorited);
  };

  return (
    <div className="movie-card" onClick={() => onCardClick(movie)}>
      <div className="rating-badge">
        <FaStar />
        <span>{rating}</span>
      </div>

      <button
        className={`favorite-btn ${isFavorited ? "is-favorited" : ""}`}
        onClick={handleFavoriteClick}
      >
        {isFavorited ? <BsHeartFill /> : <BsHeart />}
      </button>

      <div className="poster-wrapper">
        {!imageUrl ? (
          <div className="placeholder">
            <FaImage />
          </div>
        ) : (
          <img
            style={{ display: isImageLoaded ? "block" : "none" }}
            src={imageUrl}
            alt={movie.title}
            onLoad={() => setIsImageLoaded(true)}
          />
        )}

        {imageUrl && !isImageLoaded && <div className="skeleton-loader"></div>}
      </div>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;
