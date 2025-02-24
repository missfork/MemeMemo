import React, { useState, useEffect, useCallback,useRef} from 'react';
import './game.scss';
import gif1 from "../assets/1.gif";
import gif2 from "../assets/2.gif";
import gif3 from "../assets/3.gif";
import gif4 from "../assets/4.gif";
import gif5 from "../assets/5.gif";
import gif6 from "../assets/6.gif";
import gif7 from "../assets/7.gif";
import gif8 from "../assets/8.gif";

function Game() {
  const [gameCards, setGameCards] = useState([]);
  const [flip, setFlip] = useState([]);
  const [match, setMatch] = useState([]);
  const [move, setMove] = useState(0);
  const [click, setClick] = useState(true);
  const [score, setScore] = useState(0);
const modalRef =useRef();
  const gifs = [
    { gif: gif1, id: "gif1" },
    { gif: gif2, id: "gif2" },
    { gif: gif3, id: "gif3" },
    { gif: gif4, id: "gif4" },
    { gif: gif5, id: "gif5" },
    { gif: gif6, id: "gif6" },
    { gif: gif7, id: "gif7" },
    { gif: gif8, id: "gif8" },
  ];

  // Shuffle Cards
  const cardMixer = useCallback((cards) => {
    let newCards = [...cards];
    for (let i = newCards.length - 1; i > 0; i--) {
      const randomPick = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[randomPick]] = [newCards[randomPick], newCards[i]];
    }
    return newCards;
  }, []);


  const reset=()=>{
    
    cardMixer([...gifs,...gifs])
    setFlip([])
    setMatch([])
    setScore(0)
    setMove(0)
    setClick(true)
    closeModal()
  }
  const openModal = () => {
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
  };

  useEffect(() => {
    setGameCards(cardMixer([...gifs, ...gifs]));
  }, [cardMixer]);

  const handleFlip = useCallback((index) => {
    if (flip.length < 2) {
      setFlip((prev) => [...prev, index]);
    }
  }, [flip]);

  useEffect(() => {
    if (flip.length === 2) {
      setMove((prev) => prev + 1);

      if (gameCards[flip[0]].id === gameCards[flip[1]].id) {
        console.log("match",gameCards[flip[1]].id)
        setMatch((prev) => [...prev, gameCards[flip[0]]?.id]);
        setScore((prev) => {
            const currentScore=prev+1
           
            return currentScore
        });
        setFlip([]);
      }

   setClick(false)


      setTimeout(() => {
        setFlip([]);
        setClick(true)
      }, 1000);
    }
  

  }, [flip,score]);

  return (
    <div className="gameWrap">
      <div className="gameBox">
        <div className="cardHeader"><h1>Move: {move} </h1>
        <h1>Points: {score}</h1> </div>
        <div className="cardBody">
          {gameCards.map((card, index) => (
            <div 
              key={index+card.id} 
              className="oneCard" 
              onClick={() => {
                if (!match.includes(card.id) && !flip.includes(index)&&click) {
                  handleFlip(index);
                }
              }}
            >
              <div className="holder" id={match.includes(card.id) || flip.includes(index) ? "spinIt" : ""}>
                <div className="front"></div>
                <div className="back">
                  <img src={card.gif} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {  (score===8 && match.length===8)&&
        <dialog
        id='dialog' ref={modalRef}>
          <h1>🔥🔥🔥</h1>
          <h1>You won the game with in {move} moves </h1> 
          <button onClick={()=>{reset()}}>New Game</button>
        </dialog>
      }
    </div>
  );
}

export default Game;
