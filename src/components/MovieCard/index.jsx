/**
 * Componente MovieCard - Exibe informações de um filme em formato de cartão
 *
 * Funcionalidades principais:
 * - Exibição de poster, título e avaliação do filme
 * - Sistema de favoritos (adicionar/remover)
 * - Interação com APIs de filmes e favoritos
 * - Tratamento de estados de carregamento e erro
 *
 * @param {Object} movie - Dados do filme da TMDB API
 * @param {string} movie.id - ID único do filme
 * @param {string} movie.title - Título do filme
 * @param {string} movie.poster_path - Caminho do poster na TMDB
 * @param {number} movie.vote_average - Avaliação média do filme
 * @param {Function} onCardClick - Callback executado ao clicar no cartão
 * @param {boolean} isFavorited - Estado inicial de favorito (padrão: false)
 * @param {Function} onUnfavorited - Callback executado ao remover dos favoritos
 */
import { useState } from "react";
import axios from "axios";
import "./index.scss";
import { FaImage, FaStar } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useAnonymousUser } from "../../hooks/useAnonymousUser";

// URLs das APIs utilizadas
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Base para imagens da TMDB
const API_URL = `${import.meta.env.VITE_API_URL}/api/favorites`; // API de favoritos

const MovieCard = ({
  movie,
  onCardClick,
  isFavorited: initialIsFavorited = false,
  onUnfavorited,
}) => {
  // Hook para obter ID do usuário anônimo (necessário para sistema de favoritos)
  const { userId } = useAnonymousUser();

  // Estados locais do componente
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Controla visibilidade da imagem após carregamento
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited); // Estado atual do favorito

  // Constrói URL completa da imagem do poster
  const imageUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  // Formata avaliação para exibição (1 casa decimal)
  const rating = (movie.vote_average || 0).toFixed(1);

  /**
   * Manipula clique no botão de favorito
   * Alterna entre adicionar e remover dos favoritos
   * @param {Event} e - Evento de clique
   */
  const handleFavoriteClick = async (e) => {
    // Previne propagação do evento para não abrir modal do filme
    e.stopPropagation();

    // Verifica se ID do usuário está disponível
    if (!userId) {
      return;
    }

    // Lógica para remover dos favoritos
    if (isFavorited) {
      try {
        // Faz requisição DELETE para API de favoritos
        await axios.delete(API_URL, {
          data: {
            tmdbId: movie.id,
            userId: userId,
          },
        });

        // Atualiza estado local
        setIsFavorited(false);

        // Notifica componente pai sobre remoção
        if (onUnfavorited) {
          onUnfavorited(movie.id);
        }
      } catch (err) {
        console.error("Erro ao remover favorito:", err);
        // Callback opcional para tratamento específico
        console.warn(
          "Falha ao remover favorito - operação será tentada novamente na próxima sincronização"
        );
      }
    }
    // Lógica para adicionar aos favoritos
    else {
      try {
        // Prepara dados do filme para envio à API
        const movieData = {
          tmdbId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path || movie.posterPath, // Compatibilidade com diferentes formatos
          userId: userId,
          voteAverage: movie.vote_average,
        };

        // Faz requisição POST para API de favoritos
        await axios.post(API_URL, movieData);

        // Atualiza estado local
        setIsFavorited(true);
      } catch (err) {
        // Trata erro 409 (filme já é favorito)
        if (err.response && err.response.status === 409) {
          setIsFavorited(true); // Sincroniza estado
        }
      }
    }
  };

  return (
    <div className="movie-card" onClick={() => onCardClick(movie)}>
      {movie.vote_average > 0 && (
        <div className="rating-badge">
          <FaStar />
          <span>{rating}</span>
        </div>
      )}

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
