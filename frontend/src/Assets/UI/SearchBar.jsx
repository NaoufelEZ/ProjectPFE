import { useState, useEffect, useRef } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiKey, APIURL } from "../../Api/Api";
import axios from "axios";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [resultsFilter, setResultsFilter] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsFocused(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      axios
        .get(`${APIURL}/products`, {
          headers: {
            Accept: "application/json",
            "x-api-key": ApiKey,
          },
        })
        .then((response) => {
          setResults(response.data.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setResults([]);
      setResultsFilter([]);
    }
  }, [query]);

  useEffect(() => {
    const filteredResults = results.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResultsFilter(filteredResults);
  }, [query, results]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setQuery(""); // Clear the search query
    setIsFocused(false); // Hide the results dropdown
  };

  return (
    <div 
      className={`search-container ${isFocused || query ? "expanded" : ""}`}
      ref={searchContainerRef}
    >
      <div className="search-box">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
      </div>
      {resultsFilter.length > 0 && isFocused && (
        <ul className="search-results move-left">
          {resultsFilter.map((item) => (
            <li 
              onClick={() => handleProductClick(item.id)} 
              key={item.id} 
              className="search-item"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;