import { useEffect, useState } from "react";
import "./index.scss";
import { ImSpinner3 } from "react-icons/im";
import { supabase } from "../../supabaseClient";
import { useAnonymousUser } from "../../hooks/useAnonymousUser";
import MovieCard from "../../components/MovieCard";
import { FaShareAlt } from "react-icons/fa";

const FavoriteList = ({ onCardClick }) => {
  const { userId } = useAnonymousUser();

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("favorite_movies")
          .select("*")
          .eq("user_id", userId);

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
  }, [userId]);

  const handleRemoveFavorite = (removedTmdbId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((movie) => movie.tmdb_id !== removedTmdbId)
    );
  };

  const handleShareLink = () => {
    if (!userId) return;

    const shareUrl = `${window.location.origin}/share/${userId}`;

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopySuccess("Link copiado para a área de transferência!");

        setTimeout(() => setCopySuccess(""), 3000);
      })
      .catch((err) => {
        console.error("Falha ao copiar link:", err);
        setTimeout(() => setCopySuccess(""), 3000);
      });
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
    <div className="favorites-page-wrapper">
      <div className="favorites-header">
        <h2>Meus favoritos</h2>
        <button className="share-btn" onClick={handleShareLink}>
          <FaShareAlt />
          Compartilhar Lista
        </button>
        {copySuccess && <span className="copy-feedback">{copySuccess}</span>}
      </div>

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
    </div>
  );
};

export default FavoriteList;
