import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // CSV parser
import gamesFile from "../data/games.csv"; // Import CSV file

const GamesList = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(gamesFile)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true, // Treat first row as header
          skipEmptyLines: true,
          complete: (result) => setGames(result.data),
        });
      });
  }, []);

  const rows = [];
  const titles = [];
  for (let i = 0; i < 50; i += 10) {
    rows.push(games.slice(i, i + 10)); // Get next 10 images
    titles.push(
      "Trending Games",
      "Top 10 Games 2024",
      "Top 10 Party Games",
      "Top 10 Family Games",
      "Top 10 Strategy Games"
    )
  }

  return (
    <div style={{ padding: "20px" }}>
      <div>
        {rows.map((games, index) => (
            <>
            <h2>{titles[index]}</h2>

      <div style={{ display: "flex", gap: "50px", overflowX: "auto" }}>
          {games.slice(0, 10).map((game, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img
                src={game.ImagePath}
                width="200"
                height="200"
                alt={game.name}
                style={{ borderRadius: "8px" }}
              />
              <p style={{ marginTop: "5px", fontSize: "14px" }}>{game.Name}</p>
            </div>
          ))}
      </div>
      </>
        ))}
      </div>
    </div>
  );
};

export default GamesList;
