import { useState } from "react";
import axios from "axios";
import "./App.scss";
import Header from "./containers/Header";
import MovieList from "./containers/MovieList";
import MovieModal from "./containers/MovieModal";
import FavoriteList from "./containers/FavoriteList";

function App() {
  const [view, setView] = useState("search");
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const baseUrl =
    "https://tlywzgcwhnpvfzzkzxjn.supabase.co/functions/v1/search-movies";

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(baseUrl, {
        params: {
          query: searchTerm,
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRseXd6Z2N3aG5wdmZ6emt6eGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNDI2MzUsImV4cCI6MjA3NzkxODYzNX0.qgIJUrFYMr1bQZTjv-CNnnyi98gyeGvWsJVvs7CU72I",
        },
      });

      if (response.data.length === 0) {
        setMovies([]);
        setError("Nenhum filme encontrado com esse termo.");
      } else {
        setMovies(response.data);
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
      <Header onSearch={handleSearch} setView={setView} currentView={view} />

      {view === "search" && (
        <MovieList
          movies={movies}
          isLoading={loading}
          error={error}
          onCardClick={handleCardClick}
        />
      )}

      {view === "favorites" && <FavoriteList onCardClick={handleCardClick} />}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
