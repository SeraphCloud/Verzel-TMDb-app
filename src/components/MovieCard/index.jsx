import { useState } from "react";
import "./index.scss";
import { FaImage } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  return (
    <div className="movie-card">
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
