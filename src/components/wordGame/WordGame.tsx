import React, { useState } from "react";
import c from "./WordGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";

const WordGame = ({
  setCheckAnswerType,
  setShowCheckAnswer,
  current,
  totalQuestions,
  setModalActive,
}) => {
  const [word, setWord] = useState("");
  const [activeWord, setActiveWord] = useState(null);

  const imgWrite = "/image/game/fly.png";

  const btnText = [
    { name: "flown" },
    { name: "flew" },
    { name: "flow" },
    { name: "fly" },
  ];

  const handleWordClick = (wordName) => {
    setWord(wordName);
    setActiveWord(wordName);
  };

  return (
    <div className="container">
      <BaseComponentGame
        current={current}
        totalQuestions={totalQuestions}
        img={imgWrite}
        question={"Which is the Past simple (V2) of “fly”?"}
      />

      <ul className={c.buttonContainer}>
        {btnText.map((btn, i) => (
          <li
            key={i}
            className={`${c.btn} ${activeWord === btn.name ? c.activeBtn : ""}`}
            onClick={() => {
              handleWordClick(btn.name);
            }}
          >
            {btn.name}
          </li>
        ))}
      </ul>
      <BaseButtonGame
        word={word}
        setShowCheckAnswer={setShowCheckAnswer}
        setCheckAnswerType={setCheckAnswerType}
        setModalActive={setModalActive}
      />
    </div>
  );
};

export default WordGame;
