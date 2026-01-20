import React, { useEffect, useState } from "react";
import c from "./CardGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useLocation, useOutletContext } from "react-router-dom";
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
import {
  ANSWER_STATUS,
  LAST_INDEX,
  MOTIVATION_SHOW,
  PENDING,
} from "../../constants";
import { useMobileOS } from "../../hooks/useMobileOS";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const CardGame: React.FC<CardGameProps> = ({
  question,
  answerStatusesWrite,
  setShowMotivation,
}) => {
  const { setCheckAnswerType, setShowCheckAnswer, setModalActive, word, setWord } =
    useOutletContext<cardGameType>();

  const current = useSelector(selectCurrent);
  const dispatch = useDispatch();

  const iOS = useMobileOS();

  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const isLogin = useSelector(selectIsLoggedIn);

  const count = useCountWord();

  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(() => {
    const savedStatuses = sessionStorage.getItem(ANSWER_STATUS);
    if (savedStatuses) return JSON.parse(savedStatuses);
    return Array(count).fill(PENDING);
  });

  const imgWrite = `/image/game/${question.basic}.png`;

  const handleWordClick = (wordName: string) => {
    setWord(wordName);
    setActiveWord(wordName);
    if (iOS === "iOS") return;
    speakText(wordName, true); // озвучування вибраної відповіді
  };

  useEffect(() => {
  if (word === '') {
    setActiveWord(null);
    setIsChecked(false);
  }
}, [word]);


  useEffect(() => {
    sessionStorage.setItem(ANSWER_STATUS, JSON.stringify(answerStatuses));
  }, [answerStatuses]);

  useEffect(() => {
    const savedStatuses = sessionStorage.getItem(ANSWER_STATUS);
    if (savedStatuses) {
      setAnswerStatuses(JSON.parse(savedStatuses));
    }
  }, []);

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

  const location = useLocation();

  useEffect(() => {
    const half = Math.floor(count / 2);

    // якщо ще не показували — показуємо
    const wasShown = sessionStorage.getItem(MOTIVATION_SHOW);

    if (count >= 10 && current === half && !wasShown) {
      setShowMotivation(true);
      sessionStorage.setItem(MOTIVATION_SHOW, "true");
    }
  }, [current, count, setShowMotivation]);

  return (
    <>
      <BaseComponentGame
        current={current}
        img={imgWrite}
        question={isLogin ? question.basic : question.question}
        answerStatuses={
          answerStatusesWrite ? answerStatusesWrite : answerStatuses
        }
        count={count}
        translate={question.translate}
        typePast={question.typePast}
      />

      {location.pathname === "/game/check-word" && (
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
      )}

      {location.pathname === "/game/check-word" && visibility && (
        <p className={c.checkAnswer}>Обери правильну відповідь</p>
      )}

      {location.pathname === "/game/check-word" && (
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
      )}
    </>
  );
};

export default CardGame;
