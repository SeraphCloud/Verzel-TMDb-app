import SearchBar from "../SearchBar";
import "./index.scss";
import { FaFilm } from "react-icons/fa";

const Header = ({ onSearch, setView, currentView }) => {
  return (
    <nav className="header-container">
      <div className="logo-nav">
        <div className="logo" onClick={() => setView("search")}>
          <FaFilm />
          <h1>Movie List App</h1>
        </div>
      </div>

      <div className="navigation">
        <button
          className={`nav-btn ${currentView === "search" ? "active" : ""}`}
          onClick={() => setView("search")}
        >
          Buscar
        </button>

        <button
          className={`nav-btn ${currentView === "favorites" ? "active" : ""}`}
          onClick={() => setView("favorites")}
        >
          Meus favoritos
        </button>
      </div>

      {currentView === "search" && <SearchBar onSearch={onSearch} />}
    </nav>
  );
};

export default Header;
