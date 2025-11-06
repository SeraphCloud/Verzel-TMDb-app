import { useEffect, useState } from "react";
import "./index.scss";
import { ImSpinner3 } from "react-icons/im";
import { supabase } from "../../supabaseClient";
import MovieCard from "../../components/MovieCard";

const FavoriteList = ({ onCardClick }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("favorite_movies")
          .select("*");

        if (error) throw error;

        setFavorites(data);
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err.message);
        setError("Não foi possível carregar seus favoritos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = (removedTmdbId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((movie) => movie.tmdb_id !== removedTmdbId)
    );
  };

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
        <p>{error}</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="empty-favorites-container">
        <h2>Você ainda não adicionou favoritos</h2>
        <p>Clique no coração ❤️ em um filme para adicioná-lo aqui.</p>
      </div>
    );
  }

  return (
    <div className="favorite-list-container">
      {favorites.map((movie) => (
        <MovieCard
          key={movie.id}
          onCardClick={onCardClick}
          onUnfavorited={handleRemoveFavorite}
          isFavorited={true}
          movie={{
            id: movie.tmdb_id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: 0,
          }}
        />
      ))}
    </div>
  );
};

export default FavoriteList;
