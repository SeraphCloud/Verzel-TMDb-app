import SearchBar from "../SearchBar";
import "./index.scss";
import { FaReact } from "react-icons/fa";

const Header = ({ onSearch, setView, currentView, showNav = true }) => {
  return (
    <nav className="header-container">
      <div className="logo-nav">
        <div className="logo" onClick={() => setView("search")}>
          <FaReact className="header-react-icon" />
          <h1>React MovieDb</h1>
        </div>
      </div>

      {showNav && (
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
      )}

      {currentView === "search" && <SearchBar onSearch={onSearch} />}
    </nav>
  );
};

export default Header;
