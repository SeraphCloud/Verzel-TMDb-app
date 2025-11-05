import "./index.scss";
import MovieCard from "../../components/MovieCard";
import { ImSpinner3 } from "react-icons/im";
import { MdError } from "react-icons/md";

const MovieList = ({ movies, isLoading, error, onCardClick }) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <ImSpinner3 className="spinner-icon" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <MdError />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onCardClick={onCardClick} />
      ))}
    </div>
  );
};

export default MovieList;
