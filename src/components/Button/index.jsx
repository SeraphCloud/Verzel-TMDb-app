import "./index.scss";

const Button = ({ onClick, children }) => {
  return (
    <button className="default-btn" type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
