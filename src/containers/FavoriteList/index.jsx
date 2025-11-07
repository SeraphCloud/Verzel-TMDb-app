/**
 * Container FavoriteList - Gerencia e exibe lista de filmes favoritos do usuário
 *
 * Funcionalidades principais:
 * - Carrega lista de favoritos da API
 * - Exibe filmes em formato de grid
 * - Permite compartilhamento da lista via link
 * - Gerencia remoção de favoritos
 * - Tratamento de estados de carregamento e erro
 */
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.scss";
import { ImSpinner3 } from "react-icons/im";
import { useAnonymousUser } from "../../hooks/useAnonymousUser";
import MovieCard from "../../components/MovieCard";
import { FaShareAlt } from "react-icons/fa";
import useErrorHandler from "../../hooks/useErrorHandler";

// URL da API de favoritos
const API_URL = "http://localhost:3001/api/favorites";

const FavoriteList = ({ onCardClick }) => {
  // Hook para obter ID do usuário (necessário para carregar favoritos específicos)
  const { userId } = useAnonymousUser();

  // Hook para tratamento estruturado de erros
  const { handleUIError } = useErrorHandler();

  // Estados do componente
  const [favorites, setFavorites] = useState([]); // Lista de filmes favoritos
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Mensagem de erro, se houver
  const [copySuccess, setCopySuccess] = useState(""); // Feedback de cópia do link

  // Carrega lista de favoritos quando componente monta ou userId muda
  useEffect(() => {
    /**
     * Busca lista de favoritos do usuário na API
     */
    const fetchFavorites = async () => {
      // Se não há userId, não faz sentido buscar (usuário não identificado)
      if (!userId) {
        return;
      }

      // Inicia estados de carregamento
      setIsLoading(true);
      setError(null);

      try {
        // Faz requisição GET para API de favoritos
        const response = await axios.get(API_URL, {
          params: {
            userId: userId,
          },
        });

        // Atualiza lista de favoritos com dados da API
        setFavorites(response.data);
      } catch {
        setError("Não foi possível carregar seus favoritos.");
      } finally {
        // Sempre remove estado de carregamento
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]); // Executa quando userId muda

  /**
   * Remove filme da lista local de favoritos (chamado quando MovieCard remove favorito)
   * @param {string} removedTmdbId - ID do filme na TMDB que foi removido
   */
  const handleRemoveFavorite = (removedTmdbId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((movie) => movie.tmdbId !== removedTmdbId)
    );
  };

  /**
   * Gera e copia link de compartilhamento da lista de favoritos
   */
  const handleShareLink = () => {
    // Verifica se há userId disponível
    if (!userId) return;

    // Constrói URL de compartilhamento
    const shareUrl = `${window.location.origin}/share/${userId}`;

    // Tenta copiar URL para área de transferência
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopySuccess("Link copiado para a área de transferência!");
        // Remove feedback após 3 segundos
        setTimeout(() => setCopySuccess(""), 3000);
      })
      .catch((err) => {
        handleUIError(err, "FavoriteList", "share_link", () => {
          // Feedback visual para o usuário
          setCopySuccess("Erro ao copiar link. Tente novamente.");
        });
        // Mesmo em caso de erro, limpa feedback após 3 segundos
        setTimeout(() => setCopySuccess(""), 3000);
      });
  };

  // Mostra loading se estiver carregando OU se não há userId ainda
  if (isLoading || !userId) {
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

export default FavoriteList;
