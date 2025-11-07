/**
 * Componente principal da aplicação React Movie Database
 *
 * Gerencia o estado global da aplicação, incluindo:
 * - Navegação entre visualizações (busca/favoritos)
 * - Busca de filmes via API
 * - Gerenciamento do modal de detalhes
 * - Coordenação entre componentes filhos
 */
import { useState } from "react";
import axios from "axios";
import "./App.scss";
import Header from "./containers/Header";
import MovieList from "./containers/MovieList";
import MovieModal from "./containers/MovieModal";
import FavoriteList from "./containers/FavoriteList";
import { FaReact } from "react-icons/fa";

function App() {
  // Estados principais da aplicação
  const [view, setView] = useState("search"); // Controla visualização atual: "search" ou "favorites"
  const [movies, setMovies] = useState([]); // Lista de filmes retornados da busca
  const [loading, setIsLoading] = useState(false); // Estado de carregamento durante busca
  const [error, setError] = useState(null); // Mensagem de erro, se houver
  const [selectedMovie, setSelectedMovie] = useState(null); // Filme selecionado para modal
  const [hasSearched, setHasSearched] = useState(false); // Indica se já foi realizada uma busca

  // URL base da API de busca
  const API_URL = import.meta.env.VITE_API_URL;

  /**
   * Realiza busca de filmes na API
   * @param {string} searchTerm - Termo de busca fornecido pelo usuário
   */
  const handleSearch = async (searchTerm) => {
    // Ignora buscas vazias
    if (searchTerm.trim() === "") return;

    // Marca que uma busca foi realizada para mostrar resultados
    setHasSearched(true);

    // Inicia estado de carregamento e limpa erros anteriores
    setIsLoading(true);
    setError(null);

    try {
      // Faz requisição para API de busca
      const response = await axios.get(`${API_URL}/api/search`, {
        params: {
          query: searchTerm,
        },
      });

      // Trata resposta da API
      if (response.data.length === 0) {
        setMovies([]);
        setError("Nenhum filme encontrado com esse termo.");
      } else {
        setMovies(response.data);
      }
    } catch {
      setMovies([]);
      setError("Falha ao buscar filmes. Tente novamente mais tarde.");
    } finally {
      // Sempre remove estado de carregamento
      setIsLoading(false);
    }
  };

  /**
   * Manipula clique em um cartão de filme
   * @param {Object} movie - Dados do filme clicado
   */
  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  /**
   * Fecha o modal de detalhes do filme
   */
  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Header onSearch={handleSearch} setView={setView} currentView={view} />

      {view === "search" && (
        <>
          {!hasSearched && (
            <div className="empty-favorites-container">
              <div className="welcome-animation">
                <FaReact className="welcome-icon" />
                <h2 className="welcome-text">React Movie Database</h2>
              </div>
              <p>
                Use a barra de busca acima para encontrar e compartilhar seus
                filmes favoritos
              </p>
            </div>
          )}

          {hasSearched && (
            <MovieList
              movies={movies}
              isLoading={loading}
              error={error}
              onCardClick={handleCardClick}
            />
          )}
        </>
      )}

      {view === "favorites" && <FavoriteList onCardClick={handleCardClick} />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
