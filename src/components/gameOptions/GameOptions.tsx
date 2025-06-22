import { useState } from "react";
import s from "./GameOptions.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const GameOptions = () => {
  const [gameType, setGameType] = useState("");
  const [wordCount, setWordCount] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const hideSelect = location.pathname !== "/game";

  const handleSubmit = () => {
    if (gameType && wordCount) {
      navigate(`/game/${gameType}?count=${wordCount}`);
    }
  };
  return (
    <>
      {!hideSelect && (
        <>
          <div className={s.select}>
            <p>Оберіть гру:</p>
            <label>
              <input
                type="radio"
                name="gameType"
                value="write-word"
                onChange={(e) => setGameType(e.target.value)}
              />
              Write Game
            </label>
            <label>
              <input
                type="radio"
                name="gameType"
                value="check-word"
                onChange={(e) => setGameType(e.target.value)}
              />
              Check Game
            </label>
          </div>

          <div className={s.count}>
            <p>Оберіть кількість слів:</p>
            <label>
              <input
                type="radio"
                name="wordCount"
                value="5"
                onChange={(e) => setWordCount(e.target.value)}
              />
              5
            </label>
            <label>
              <input
                type="radio"
                name="wordCount"
                value="10"
                onChange={(e) => setWordCount(e.target.value)}
              />
              10
            </label>
            <label>
              <input
                type="radio"
                name="wordCount"
                value="20"
                onChange={(e) => setWordCount(e.target.value)}
              />
              20
            </label>
          </div>

          <button onClick={handleSubmit} disabled={!gameType || !wordCount}>
            Підтвердити
          </button>
        </>
      )}
    </>
  );
};

export default GameOptions;
