import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import gamesFile from "../data/games.csv";
import ReactStars from "react-stars"; // Import rating component
import ActionButton from "./ActionButton"; // Import ActionButton component
import { Button, Modal } from "react-bootstrap"; // Install if not added: npm install react-bootstrap bootstrap
import MoreLikeThis from "./MoreLikeThis";

const GameInfo = ({game}) => {
  return (
    <div style={{ display: "flex", gap: "18px", marginTop: "10px" }}>

      <p>
        <strong>Players:</strong> {game.MinPlayers} - {game.MaxPlayers}
      </p>
      <p>
        <strong>Complexity:</strong> {Number(game.GameWeight).toFixed(1)} /   5
      </p>
      <p>
        <strong>Playing Time:</strong> {game.ComMinPlaytime} - {game.ComMaxPlaytime} Mins
      </p>
    </div>
  );
}

const GameDetails = () => {
  const { id } = useParams(); // Get the game name from the URL
  const [game, setGame] = useState(null);
  const [games, setGames] = useState([]);
  const [cover, setCover] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(gamesFile)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const foundGame = result.data.find((g) => g.Name === id);
            setGames(result.data);
            setGame(foundGame);
          },
        });
      });
  }, [id]);

  const findSimilarGames = (currentGame, allGames) => {
    if (!currentGame) return [];
  
    const gameNameParts = currentGame.Name.toLowerCase().split(" "); // Break name into words
  
    return allGames
      .filter((g) => {
        if (g.Name === currentGame.Name) return false; // Exclude the current game
  
        const lowerName = g.Name.toLowerCase();
        const nameMatch = gameNameParts.some((part) => lowerName.includes(part)); // Check for partial match in name
  
        return (
          nameMatch
        );
      })
      .slice(0, 5); // Get the top 5 similar games
  };
  const similarGames = findSimilarGames(game, games);
  console.log("Similar Games:", similarGames); // 🔹 Debugging output
  useEffect(() => {
    if (!game) return; // Ensure game exists before fetching cover
  
    const fetchGameImage = async (gameName) => {
      try {
        const response = await fetch(
          `https://boardgamegeek.com/xmlapi2/search?query=${gameName}&type=boardgame`
        );
        const text = await response.text();
  
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        const gameId = xmlDoc.querySelector("item")?.getAttribute("id");
  
        if (gameId) {
          const gameDetailsResponse = await fetch(
            `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`
          );
          const gameDetailsText = await gameDetailsResponse.text();
          const gameDetailsDoc = parser.parseFromString(gameDetailsText, "text/xml");
  
          const imageUrl = gameDetailsDoc.querySelector("image")?.textContent || "";
          console.log("Game Cover Image:", imageUrl); // Debugging
          setCover(imageUrl); // ✅ Set the cover image
        }
      } catch (error) {
        console.error("Error fetching game image:", error);
      }
    };
  
    fetchGameImage(game.Name);
  }, [game]); // ✅ Runs only when `game` changes
  // ✅ Runs only when `game` changes

  if (!game) return <p>Loading...</p>;
  

  return (
    <div>
      {/* Cover Image with Gradient */}
      <div
        style={{
          width: "100%",
          height: "750px",
          background: `linear-gradient(to right, black 10%, rgba(0, 0, 0, 0.85) 60%, transparent 80%), url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          padding: "40px",
          color: "white",
          lineHeight: "0.7",
        }}
      >

        <div>
              {/* Game Details Section */}
              <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
                <img
                  src={game.ImagePath}
                  width="150"
                  height="190"
                  alt={game.Name}
                  style={{ borderRadius: "10px" }}
                />
                <div>

                    <h2 style={{ fontSize: "24px"}}>{game.Name} ({game.YearPublished})</h2>
                    <p>Shape the medieval landscape of France, claiming cities, monasteries and farms. </p>

                    <hr style={{ marginTop: "10px", border: "0", height: "1px", background: "#ccc", width: "100%" }} />
                    <GameInfo game={game} />

                    {/* ⭐ Rating Bar */}
                    <div style={{ marginTop: "10px" }}>
                      <h2 style={{ marginTop: "10px", fontSize: "30px"}}>{Number(game.AvgRating).toFixed(1)} / 10</h2>
                      <p>( {Number(game.NumUserRatings/1000).toFixed(1)}K Ratings )</p>
                    </div>

                    {/* Rent & Buy Buttons */}
                    <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
                      <ActionButton title="Rent for Rs 100" onClick={() => setShowModal(true)}/>
                      <ActionButton title="Buy for Rs 1000" onClick={() => setShowModal(true)}/>
                    </div>

                </div>
              </div>

              <h2 style={{ marginLeft: "40px", fontSize: "20px", marginTop: "40px"}}>More Like This: </h2>

              <div style={{ display: "flex", gap: "20px", marginLeft: "40px", marginTop: "20px" }}>
                {similarGames.map((g, index) => (
                  <MoreLikeThis key={index} game={g} />
                ))}
              </div>

                {/* Out of Stock Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Out of Stock</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    The game is out of stock right now. Please try again later.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
        </div>

      </div>

    </div>
  );
};

export default GameDetails;
