import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import c from "./WordGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import type { allGameType } from "../../utils/gameType";

const WordGame = () => {
  const { setCheckAnswerType, setShowCheckAnswer, current, setModalActive } =
    useOutletContext<allGameType>();

  const [word, setWord] = useState("");
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const imgWrite = "/image/game/fly.png";

  const btnText = [
    { name: "flown" },
    { name: "flew" },
    { name: "flow" },
    { name: "fly" },
  ];

  const handleWordClick = (wordName : string) => {
    setWord(wordName);
    setActiveWord(wordName);
  };

  return (
    <div className="container">
      <BaseComponentGame
        current={current}
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
