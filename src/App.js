import React, { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './SingleCard';

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png" ,matched: false},
  { src: "/img/ring-1.png", matched: false},
  { src: "/img/scroll-1.png", matched: false},
  { src: "/img/shield-1.png" ,matched: false},
  { src: "/img/sword-1.png",matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled]= useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: `${card.src}-${index}` }));
    
    setChoiceOne(null)
    setChoiceTwo(null)
      setCards(shuffleCards);
    setTurns(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => 
          prevCards.map(card => 
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000); // Delay before flipping unmatched cards back
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false)
  };

  // star a new game automagically 

  useEffect(()=>{

shuffleCards()


  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched} // Fixed flipped condition
            disabled={disabled}
          
          />
        ))}
      </div>
      <p>Turns: {turns}</p> {/* Added a turns counter */}
    </div>
  );
}

export default App;
