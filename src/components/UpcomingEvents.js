import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // CSV parser


const UpcomingEvents = () => {
  const [games, setGames] = useState([]);

    useEffect(() => {
      fetch(process.env.PUBLIC_URL + "/event_games.json")
        .then((response) => response.json())
        .then((data) => setGames(data))
        .catch((error) => console.error("Error loading games:", error));
    }, []);

  return (
    <div>
      {/* Cover Image with Gradient */}
      <div
        style={{
          width: "100%",
          background: `linear-gradient(to right, black 10%, rgba(0, 0, 0, 0.85) 60%, transparent 80%), url(https://catanuniverse.com/wp-content/uploads/2019/08/Catan_1920x1080.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",  // 🔹 Makes background stay in place when scrolling
          display: "flex",
          padding: "40px",
          color: "white",
          minHeight: "100vh",  // 🔹 Ensures it covers the entire page
          lineHeight: "0.7",
        }}
      >

        <div>
              {/* Game Details Section */}
              <div style={{ display: "flex",
              flexWrap: "wrap", gap: "40px", padding: "20px" }}>

                <div>

                <h2 style={{fontSize: "60px", marginTop: "40px"}}>Club House, Arvind Sporcia </h2>
                    <p>Board games are far, faar, FAAAR better than you think of them.</p>
                    <hr style={{ marginTop: "10px", border: "0", height: "1px", background: "#ccc", width: "100%" }} />
                    <h2 style={{fontSize: "20px", marginTop: "40px"}}>Details: </h2>
                    <ul>
                      <li>Date: 8th March, Sunday</li>
                      <li>Time: 5 PM - 8 PM</li>
                      <li>Charges: Rs 299 per head</li>
                      <li>Games Available: 35</li>
                    </ul>
                    
                    <h2 style={{fontSize: "20px", marginTop: "40px"}}>Games List for the Event: </h2>

                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", // 🔹 Adjusts dynamically
                      gap: "50px",
                      justifyContent: "center",
                      padding: "20px"
                    }}>
                      {games.map((game, index) => (
                        <div key={index} style={{ textAlign: "center" }}>
                          <img
                            src={game.ImagePath}
                            width="200"
                            height="200"
                            alt={game.Name}
                            style={{ borderRadius: "8px", objectFit: "cover" }}
                          />
                          <p style={{ marginTop: "25px", fontSize: "14px" }}>{game.Name}</p>
                        </div>
                      ))}
                    </div>

                </div>
              </div>
        </div>

      </div>

    </div>
  );
};

export default UpcomingEvents;
