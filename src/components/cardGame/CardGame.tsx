import React, { useEffect, useState } from "react";
import c from "./CardGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useOutletContext } from "react-router-dom";
import type {
  AnswerStatus,
  BtnType,
  CardGameProps,
  cardGameType,
} from "../../utils/gameType";
import { speakText } from "../../utils/voiseFunction";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../redux/game/selectors";
import { useCountWord } from "../../hooks/gameHooks";

const CardGame: React.FC<CardGameProps> = ({ question }) => {
  const { setCheckAnswerType, setShowCheckAnswer, setModalActive } =
    useOutletContext<cardGameType>();

  const current = useSelector(selectCurrent);

  const [word, setWord] = useState<string>("");
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);

  const count = useCountWord();

  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(
    Array(count).fill("pending")
  );

  const imgWrite = "/image/game/fly.png";

  const handleWordClick = (wordName: string) => {
    setWord(wordName);
    setActiveWord(wordName);
    speakText(wordName, true); // озвучування вибраної відповіді
  };

  useEffect(() => {
    setWord("");
    setActiveWord(null);
    setIsChecked(false);
  }, [current]);

  return (
    <>
      <BaseComponentGame
        current={current}
        img={imgWrite}
        question={question.question}
        answerStatuses={answerStatuses}
        count={count}
      />

      <ul className={c.buttonContainer}>
        {question?.variants?.map((btn: BtnType, i: number) => {
          const isCorrect = btn.name === question.correctAnswer;
          const isSelected = btn.name === activeWord;

          let btnClass = c.btn;

          if (isChecked) {
            if (isSelected && isCorrect) {
              btnClass += ` ${c.correct}`; // вибрав правильно
            } else if (isSelected && !isCorrect) {
              btnClass += ` ${c.wrong}`; // вибрав неправильно
            } else if (!isSelected && isCorrect) {
              btnClass += ` ${c.showCorrect}`; // показати правильний варіант
            }
          } else {
            if (isSelected) btnClass += ` ${c.activeBtn}`; // просто вибір
          }

          return (
            <li
              key={i}
              className={btnClass}
              onClick={() => {
                if (!isChecked) handleWordClick(btn.name); // заблокувати зміну після перевірки
              }}
            >
              {btn.name}
            </li>
          );
        })}
      </ul>

      <BaseButtonGame
        word={word}
        setShowCheckAnswer={setShowCheckAnswer}
        setCheckAnswerType={setCheckAnswerType}
        setModalActive={setModalActive}
        correctAnswer={question.correctAnswer}
        answerStatuses={answerStatuses}
        setAnswerStatuses={setAnswerStatuses}
        current={current}
        setIsChecked={setIsChecked}
      />
    </>
  );
};

export default CardGame;
