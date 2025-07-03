import { useEffect, useState } from "react";
import c from "./CardGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useOutletContext } from "react-router-dom";
import type {
  BtnType,
  CardGameProps,
  cardGameType,
} from "../../utils/gameType";
import { speakText } from "../../utils/voiseFunction";

const CardGame = ({ question }: CardGameProps) => {
  const { setCheckAnswerType, setShowCheckAnswer, current, setModalActive } =
    useOutletContext<cardGameType>();

  const [word, setWord] = useState("");
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const imgWrite = "/image/game/fly.png";

  const handleWordClick = (wordName: string) => {
    setWord(wordName);
    setActiveWord(wordName);
    speakText(wordName, true); // озвучування вибраної відповіді
  };

  useEffect(() => {
    setWord("");
    setActiveWord(null);
  }, [current]);

  return (
    <>
      <BaseComponentGame
        current={current}
        img={imgWrite}
        question={question.question}
      />

      <ul className={c.buttonContainer}>
        {question?.variants?.map((btn: BtnType, i: number) => (
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
        correctAnswer={question.correctAnswer}
      />
    </>
  );
};

export default CardGame;
