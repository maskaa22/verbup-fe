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
import { useDispatch } from "react-redux";
import { setCurrent } from "../../redux/game/slice";
import { ANSWER_STATUS, LAST_INDEX, PENDING } from "../../constants";
import { useMobileOS } from "../../hooks/useMobileOS";

const CardGame: React.FC<CardGameProps> = ({ question }) => {
  const { setCheckAnswerType, setShowCheckAnswer, setModalActive } =
    useOutletContext<cardGameType>();

  const current = useSelector(selectCurrent);
  const dispatch = useDispatch();

  const iOS = useMobileOS();

  const [word, setWord] = useState<string>("");
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const count = useCountWord();

  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(() => {
    const savedStatuses = sessionStorage.getItem(ANSWER_STATUS);
    if (savedStatuses) return JSON.parse(savedStatuses);
    return Array(count).fill(PENDING);
  });

  const imgWrite = `/image/game/${question.base_form}.png`;

  const handleWordClick = (wordName: string) => {
    setWord(wordName);
    setActiveWord(wordName);
    if(iOS === "iOS") return;
    speakText(wordName, true); // озвучування вибраної відповіді
  };

  useEffect(() => {
    setWord("");
    setActiveWord(null);
    setIsChecked(false);
  }, [current]);

  useEffect(() => {
    sessionStorage.setItem(ANSWER_STATUS, JSON.stringify(answerStatuses));
  }, [answerStatuses]);

  useEffect(() => {
    const savedStatuses = sessionStorage.getItem(ANSWER_STATUS);
    if (savedStatuses) {
      setAnswerStatuses(JSON.parse(savedStatuses));
    }
  }, []);

  console.log(question);
  

  useEffect(() => {
    if (answerStatuses.length === 0) return;

    const savedIndex = sessionStorage.getItem(LAST_INDEX);
    const lastIndex = Number(savedIndex ?? 0);

    const newIndex =
      answerStatuses[lastIndex] !== PENDING &&
      lastIndex + 1 < answerStatuses.length
        ? lastIndex + 1
        : lastIndex;

    if (newIndex >= answerStatuses.length) {
      return;
    }

    if (current !== newIndex) {
      dispatch(setCurrent(newIndex));
    }

  }, []);

  return (
    <>
      <BaseComponentGame
        current={current}
        img={imgWrite}
        question={question.question}
        answerStatuses={answerStatuses}
        count={count}
        translate={question.translate}
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

      {visibility && <p className={c.checkAnswer}>Обери правильну відповідь</p>}

      <BaseButtonGame
        setVisibility={setVisibility}
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
