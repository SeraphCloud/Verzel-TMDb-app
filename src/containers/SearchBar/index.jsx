import "./index.scss";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbar-container">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch}>
        <BsSearch />
      </Button>
    </div>
  );
};

export default SearchBar;
