import { useState, useEffect } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ApiKey, APIURL } from "../../Api/Api";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [resultsFilter, setResultsFilter] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      axios.get(`${APIURL}/products`, {
        headers: {
          Accept: "application/json",
          "x-api-key": ApiKey,
        }
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
    const filteredResults = results.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResultsFilter(filteredResults);
  }, [query, results]);
  console.log(resultsFilter)

  return (
    <div className="position-relative">
      <input
        style={{ outline: "none" }}
        className="bg-light border border-black border-top-0 border-end-0 border-start-0 border-bottom-2"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <FontAwesomeIcon
        role="button"
        className="mb-0 h6 position-absolute end-0"
        icon={faMagnifyingGlass}
      />
      {resultsFilter.length > 0 && (
        <ul className="list-group position-absolute bg-white w-100 shadow">
          {resultsFilter.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
