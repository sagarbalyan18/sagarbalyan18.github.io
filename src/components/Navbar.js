import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ActionButton from "./ActionButton";
import Papa from "papaparse";
import gamesFile from "../data/games.csv";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // 🔹 Fetch CSV once on mount
  useEffect(() => {
    setLoading(true);
    fetch(gamesFile)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setGames(result.data); // ✅ Store games in state
            setLoading(false);
          },
        });
      });
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredGames([]);
      return;
    }
  
    const lowerQuery = searchQuery.trim().toLowerCase();
  
    const exactMatches = games.filter((game) => game.Name.toLowerCase() === lowerQuery);
    const partialMatches = games.filter(
      (game) => game.Name.toLowerCase().includes(lowerQuery) && game.Name.toLowerCase() !== lowerQuery
    );
  
    const sortedResults = [...exactMatches, ...partialMatches].sort((a, b) => {
      const aStartsWith = a.Name.toLowerCase().startsWith(lowerQuery);
      const bStartsWith = b.Name.toLowerCase().startsWith(lowerQuery);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      return a.Name.localeCompare(b.Name);
    });
  
    setFilteredGames(sortedResults);
  }, [searchQuery, games]);
  

  const handleSelectGame = (gameName) => {
    setSearchQuery(gameName);
    setShowDropdown(false);
    navigate(`/game/${gameName}`);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">GAB</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/games">Games</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/upcoming-events">Upcoming Events</Link>
            </li>
          </ul>
          
          {/* 🔹 Search Bar with Loader */}
          <div style={{ position: "relative" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // 🔹 Prevent flickering
            />
            
            {/* 🔹 Loader (Shows only while loading) */}
            {loading && (
              <div style={{ position: "absolute", top: "40px", left: "10px", color: "#888" }}>
                Loading...
              </div>
            )}

            {/* 🔹 Dropdown only if NOT loading */}
            {!loading && showDropdown && filteredGames.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  width: "100%",
                  background: "white",
                  listStyle: "none",
                  padding: "0",
                  margin: "0",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  borderRadius: "5px",
                  overflow: "hidden",
                  zIndex: 1000,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {filteredGames.map((game) => (
                  <li
                    key={game.Name}
                    onClick={() => handleSelectGame(game.Name)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {game.Name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <ActionButton className="btn btn-outline-success" type="submit" title="Search" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;