import SearchBar from "../SearchBar";
import "./index.scss";

const Header = ({ onSearch }) => {
  return (
    <nav>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Header;
