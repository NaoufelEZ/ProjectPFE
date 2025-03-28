import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  return (
    <div className="position-relative">
      <input style={{outline:"none"}} className="bg-light border border-black border-top-0 border-end-0 border-start-0 border-bottom-2" type="text" placeholder="Search..."/>
      <FontAwesomeIcon role="button"  className="mb-0 h6 position-absolute end-0" icon={faMagnifyingGlass}/>
    </div>
  )
}

export default SearchBar;