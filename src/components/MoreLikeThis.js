import React from "react";
import { useNavigate } from "react-router-dom";

const MoreLikeThis = ({ game }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${game.Name}`);
  };

  return (
    <div
      style={{ marginLeft: "25px", marginTop: "10px", textAlign: "center", width: "150px", cursor: "pointer" }}
      onClick={handleClick}
    >
      <img
        src={game.ImagePath}
        width="150"
        height="190"
        alt={game.Name}
        style={{ borderRadius: "10px" }}
      />
      <p style={{ marginTop: "20px" }}>{game.Name} ({game.YearPublished})</p>
    </div>
  );
};

export default MoreLikeThis;