import React from 'react';
import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped }) {

  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card-front" />
        <img className="back" src="/img/cover.png" alt="card-back" />
      </div>
    </div>
  );
}