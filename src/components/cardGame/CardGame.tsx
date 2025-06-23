import React, { useState } from "react";
import c from "./CardGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useOutletContext } from "react-router-dom";
// import type { allGameType } from "../../utils/gameType";

const CardGame = ({ question }) => {
  const { setCheckAnswerType, setShowCheckAnswer, current, setModalActive } =
    useOutletContext();

  const [word, setWord] = useState("");
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const imgWrite = "/image/game/fly.png";

  const handleWordClick = (wordName: string) => {
    setWord(wordName);
    setActiveWord(wordName);
  };

  return (
    <>
      <BaseComponentGame
        current={current}
        img={imgWrite}
        question={question.question}
      />

      <ul className={c.buttonContainer}>
        {question?.variants?.map((btn, i) => (
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
    </>
  );
};

export default CardGame;
