/**
 * Página SharePage - Exibe lista de favoritos compartilhada de outro usuário
 *
 * Funcionalidades principais:
 * - Carrega lista de favoritos via parâmetro de URL (userId)
 * - Exibe filmes em formato de grid (sem controles de favorito)
 * - Tratamento de estados de carregamento e erro
 * - Interface simplificada para visualização apenas
 *
 * Rota: /share/:userId
 */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import "./containers/FavoriteList/index.scss";
import Header from "./containers/Header";
import MovieCard from "./components/MovieCard";

// URL da API de favoritos
const API_URL = "http://localhost:3001/api/favorites";

const SharePage = () => {
  // Extrai userId da URL (parâmetro de rota)
  const { userId } = useParams();

  // Estados do componente
  const [favorites, setFavorites] = useState([]); // Lista de filmes favoritos compartilhados
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Mensagem de erro, se houver

  // Carrega lista de favoritos compartilhados quando componente monta ou userId muda
  useEffect(() => {
    /**
     * Busca lista de favoritos compartilhada de outro usuário
     */
    const fetchSharedFavorites = async () => {
      // Valida se há userId na URL
      if (!userId) {
        setError("ID de usuário inválido.");
        setIsLoading(false);
        return;
      }

      // Inicia estados de carregamento
      setIsLoading(true);
      setError(null);

      try {
        // Faz requisição GET para API de favoritos com userId da URL
        const response = await axios.get(API_URL, {
          params: {
            userId: userId,
          },
        });
        setFavorites(response.data);
      } catch {
        setError("Não foi possível carregar esta lista");
      } finally {
        // Sempre remove estado de carregamento
        setIsLoading(false);
      }
    };

    fetchSharedFavorites();
  }, [userId]); // Executa quando userId muda

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
      <Header setView={() => {}} currentView="favorites" showNav={false} />

      <div className="favorite-list-container">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            isFavorited={true}
            movie={{
              id: movie.tmdbId,
              title: movie.title,
              poster_path: movie.posterPath,
              vote_average: movie.voteAverage,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SharePage;
