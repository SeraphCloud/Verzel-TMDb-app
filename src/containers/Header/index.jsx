import SearchBar from "../SearchBar";
import "./index.scss";
import { FaFilm } from "react-icons/fa";

const Header = ({ onSearch }) => {
  return (
    <nav className="header-container">
      <div className="logo">
        <FaFilm />
        <h1>Movie List App</h1>
      </div>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Header;
