import "./index.scss";

const Input = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      type="text"
      className="search"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
