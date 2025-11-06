import { useState } from "react";
import { supabase } from "../../supabaseClient";
import "./index.scss";
import { FaImage, FaStar } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({
  movie,
  onCardClick,
  isFavorited: initialIsFavorited = false,
  onUnfavorited,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const rating = movie.vote_average.toFixed(1);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    //
    if (isFavorited) {
      try {
        const { error } = await supabase
          .from("favorite_movies")
          .delete()
          .match({ tmdb_id: movie.id });

        if (error) throw error;

        setIsFavorited(false);
        console.log("Removido os favoritos", movie.title);
        //
        if (onUnfavorited) {
          onUnfavorited(movie.id);
        }
      } catch (err) {
        console.error("Erro ao remover favorito", err.message);
      }
    } else {
      //
      try {
        const movieData = {
          tmdb_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        };
        //
        const { error } = await supabase
          .from("favorite_movies")
          .insert(movieData);
        //
        if (error) throw error;
        //
        setIsFavorited(true);
        console.log("Adicionado aos favoritos:", movie.title);
      } catch (err) {
        if (err.code === "23505") {
          console.warn("Este filme já está nos favoritos (erro 23505).");
          setIsFavorited(true);
        } else {
          console.error("Erro ao adicionar favorito:", err.message);
        }
      }
    }
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
