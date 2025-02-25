import React, { useState, useEffect, useCallback, useRef } from "react";
import "./game.scss";
import localStorageUtil from "../util/localStorage";
import gif1 from "../assets/1.gif";
import gif2 from "../assets/2.gif";
import gif3 from "../assets/3.gif";
import gif4 from "../assets/4.gif";
import gif5 from "../assets/5.gif";
import gif6 from "../assets/6.gif";
import gif7 from "../assets/7.gif";
import gif8 from "../assets/8.gif";
import noob from "../assets/noob.gif";
import advance from "../assets/advance.gif";
import god from "../assets/god.gif";
import intermediate from "../assets/intermediate.gif";
import flipSound from "../assets/flip.wav";
import winSound from "../assets/win.wav";
import failSound from "../assets/wrong.mp3";
function Game({ goHome }) {
  const [gameCards, setGameCards] = useState(
    localStorageUtil.getItem("cards") || []
  );
  const [flip, setFlip] = useState(localStorageUtil.getItem("flip") || []);
  const [match, setMatch] = useState(localStorageUtil.getItem("match") || []);
  const [move, setMove] = useState(localStorageUtil.getItem("move") || 0);
  const [click, setClick] = useState(true);
  const [score, setScore] = useState(localStorageUtil.getItem("score") || 0);
  const modalRef = useRef();
  const audioWinRef = useRef(new Audio(winSound));
  const audioFailRef = useRef(new Audio(failSound));
  const audioFlipRef = useRef(new Audio(flipSound));
  const moveRef = useRef(move);
  const scoreRef = useRef(score);
  const flipRef = useRef(flip);
  const matchRef = useRef(match);
  const gameCardsRef = useRef(gameCards);

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

  useEffect(() => {
    moveRef.current = move;
    scoreRef.current = score;
    flipRef.current = flip;
    matchRef.current = match;
    gameCardsRef.current = gameCards;
  }, [move, score, flip, match, gameCards]);

  useEffect(() => {
    if (!localStorageUtil.getItem("move")) {
      setGameCards(cardMixer([...gifs, ...gifs]));
    }

    return () => {
      console.log("Cleanup", moveRef.current, scoreRef.current);
      // save game data
      if (moveRef.current > 0 && scoreRef.current < 8) {
        localStorageUtil.setItem("score", scoreRef.current);
        localStorageUtil.setItem("move", moveRef.current);
        localStorageUtil.setItem("flip", flipRef.current);
        localStorageUtil.setItem("cards", gameCardsRef.current);
        localStorageUtil.setItem("match", matchRef.current);
        localStorageUtil.setItem("pause", true);
      } else {
        localStorageUtil.clearStorage();
      }
    };
  }, []);

  const handleFlip = useCallback(
    (index) => {
      if (flip.length < 2) {
        audioFlipRef.current.play();
        setFlip((prev) => [...prev, index]);
      }
    },
    [flip]
  );

  useEffect(() => {
    if (flip.length === 2) {
      setMove((prev) => prev + 1);

      if (gameCards[flip[0]].id === gameCards[flip[1]].id) {
        setMatch((prev) => [...prev, gameCards[flip[0]]?.id]);
        setScore((prev) => prev + 1);
        audioWinRef.current.play();
        setFlip([]);
      }
      else{
        audioFailRef.current.play()
      }

      setClick(false);

      setTimeout(() => {
        setFlip([]);
        setClick(true);
      }, 1000);
    }
  }, [flip]);

  const reset = () => {
    setGameCards(cardMixer([...gifs, ...gifs]));
    setFlip([]);
    setMatch([]);
    setScore(0);
    setMove(0);
    setClick(true);
    localStorageUtil.clearStorage();
  };
  const memeTiers = {
    god: {
      title: "👑 GOD MODE",
      description: "ഹൈ റേഞ്ചിന്റെ വിപ്ലവസിംഹം",
      gif: god,
    },
    advanced: {
      title: "🔥 ADVANCED",
      description: "ഇന്ത്യൻ സൈബർ വിംഗിൻ്റെ കമാൻഡിംഗ് ഓഫീസർ മേജർ ശ്രീകുമാർ !!)",
      gif: advance,
    },
    intermediate: {
      title: "😐 INTERMEDIATE",
      description: "ഞാൻ ആരാ ചേട്ടാ ..!!",
      gif: intermediate,
    },
    noob: {
      title: "🤡 NOOB TIER",
      description: "ഇത്രയും വലിയ ഗതിക്കെട്ടവൻ ആരെങ്കിലും ഉണ്ടാകുമോ..!!",
      gif: noob,
    },
  };
function getMemeTier() {
    if (move < 8) return memeTiers.advanced;

    const efficiency = score / move;

    if (score === 8 && move === 8) return memeTiers.god;
    if (efficiency >= 0.9) return memeTiers.advanced;
    if (efficiency >= 0.5) return memeTiers.intermediate;
    if (efficiency < 0.5) return memeTiers.noob;

     
    
    
}


  return (
    <div className="gameWrap">
      <div className="cardHeader">
        <div className="title">
          <h2 onClick={() => goHome(false)}>MemeMemo</h2>
        </div>
        <div className="value">
          <h1>
            <span>Score: </span>
            {score}
          </h1>
          <h1>
            <span>Moves: </span>
            {move}
          </h1>
        </div>
      </div>
      <div className="gameBox">
        <div className="cardBody">
          {gameCards.map((card, index) => (
            <div
              key={index + card.id}
              className="oneCard"
              onClick={() => {
                if (
                  !match.includes(card.id) &&
                  !flip.includes(index) &&
                  click
                ) {
                  handleFlip(index);
                }
              }}
            >
              <div
                className="holder"
                id={
                  match.includes(card.id) || flip.includes(index)
                    ? "spinIt"
                    : ""
                }
              >
                <div className="front"></div>
                <div className="back">
                  <img src={card.gif} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {score >= 8 && match.length>=8 && (
        <div id="bg">
          <div id="dialog" ref={modalRef}>
            <div className="pro">
              <img src={getMemeTier()?.gif} alt="" />
            </div>
            <h1>{getMemeTier()?.title}</h1>
            <h1 id="descript">{getMemeTier()?.description}</h1>
            <h1>You won the game within {move} moves</h1>
            <button onClick={reset}>New Game</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
