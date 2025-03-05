import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import gamesFile from "../data/games.csv";
import { useNavigate, useLocation } from "react-router-dom";

const Search = () => {
  const [games, setGames] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    fetch(gamesFile)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => setGames(result.data),
        });
      });
  }, []);

  // Filter games based on search query
  const filteredGames = games.filter((game) =>
    game.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", width: "100%", padding: "20px" }}>
      <h2>Search Results for: "{searchQuery}"</h2>

      {filteredGames.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          {filteredGames.map((game, index) => (
            <div
              key={index}
              onClick={() => navigate(`/game/${game.Name}`)}
              style={{ textAlign: "center", cursor: "pointer", marginBottom: "20px", maxWidth: "200px" }}
            >
              <a style={{ fontSize: "18px", display: "block", color: "blue", textDecoration: "underline" }}>
                {game.Name.substring(0, 10)} ({game.YearPublished})
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
