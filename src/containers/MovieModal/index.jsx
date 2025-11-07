import "./index.scss";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation}>
        <button className="close-btn" onClick={onClose}>
          <IoCloseCircleOutline />
        </button>

        <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
        <div className="modal-details">
          <h2>{movie.title}</h2>
          <p className="overview">{movie.overview}</p>
          <div className="info">
            <span>
              Nota: {(movie.vote_average || 0).toFixed(1)} <FaStar />
            </span>
            <span>Lançamento: {movie.release_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
