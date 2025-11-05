import { useState } from "react";
import axios from "axios";
import "./App.scss";
import Header from "./containers/Header";
import MovieList from "./containers/MovieList";
import MovieModal from "./containers/MovieModal";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const baseUrl = "https://api.themoviedb.org/3/search/movie";

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(baseUrl, {
        params: {
          api_key: apiKey,
          query: searchTerm,
          language: "pt-BR",
        },
      });

      if (response.data.results.length === 0) {
        setMovies([]);
        setError("Nenhum filme encontrado com esse termo.");
      } else {
        setMovies(response.data.results);
      }
    } catch (err) {
      console.error("Erro ao buscar filmes:", err);
      setMovies([]);

      setError("Falha ao buscar filmes. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />

      <MovieList
        movies={movies}
        isLoading={loading}
        error={error}
        onCardClick={handleCardClick}
      />

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
