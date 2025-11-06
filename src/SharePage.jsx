import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { ImSpinner3 } from "react-icons/im";
import "./containers/FavoriteList/index.scss";
import Header from "./containers/Header";
import MovieCard from "./components/MovieCard";

const SharePage = () => {
  const { userId } = useParams();

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedFavorites = async () => {
      if (!userId) {
        setError("ID de usuário inválido.");
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
        console.error("Erro ao buscar lista compartilhada", err.message);
        setError("Não foi possível carregar esta lista");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedFavorites();
  }, [userId]);

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
        <h2>Esta lista de favoritos está vazia</h2>
      </div>
    );
  }

  return (
    <div>
      <Header setView={() => {}} currentView="favorites" />

      <div className="favorite-list-container">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
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

export default SharePage;
