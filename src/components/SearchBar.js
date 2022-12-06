// Import des dépedances
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = ({
  text,
  setText,
  onChangeHandler,
  suggestions,
  setSuggestions,
  params,
  setParams,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleSubmitSearch = (event) => {
    event.preventDefault();
    if (pathname === "/alloffersmap") {
      const newParams = { ...params };
      newParams.name = text;
      setParams(newParams);
      setText("");
    } else {
      navigate("/alloffersmap", { state: { name: text } });
      setText("");
    }
    setSuggestions([]);
  };
  return (
    <div>
      <form className="search-form" onSubmit={handleSubmitSearch}>
        <input
          type="text"
          placeholder="Search a shop"
          value={text}
          className="search-input"
          onChange={(event) => {
            onChangeHandler(event.target.value);
          }}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 150);
          }}
        />
        <input type="submit" className="search-submit-btn" />
      </form>
      {suggestions && suggestions.length > 0 && (
        <div className="suggestions-div">
          {suggestions.map((suggestion, index) => {
            return (
              <div
                key={index}
                className="suggestion"
                onClick={() => {
                  if (pathname === "/alloffersmap") {
                    const newParams = { ...params };
                    newParams.name = suggestion.name;
                    setParams(newParams);
                    setText("");
                  } else {
                    navigate("/alloffersmap", {
                      state: { name: suggestion.name },
                    });
                    setText("");
                  }
                  setSuggestions([]);
                }}
              >
                {suggestion.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
