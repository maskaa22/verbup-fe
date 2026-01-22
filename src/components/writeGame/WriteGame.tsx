import { useCallback, useEffect, useState } from "react";
import s from "./WriteGame.module.css";

import Keyboard from "../keyboard/Keyboard";
import { handleBackspace, handleKeyPress } from "../../utils/gameFunctions";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import type {
  AnswerStatus,
  cardGameType,
  currentAnswerAndQuestions,
} from "../../utils/gameType";
import { useCountWord } from "../../hooks/gameHooks";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../redux/game/selectors";
import CardGame from "../cardGame/CardGame";
import {
  ANSWER_STATUS,
  CORRECT,
  CURRENT_GAME,
  ERROR,
  LAST_INDEX,
  PENDING,
  SUCCESS,
  WRONG,
} from "../../constants";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { hydrateFromStorage } from "../../redux/game/slice";
import MotivationModal from "../motivationModal/MotivationModal";

const WriteGame = () => {
  const {
    setCheckAnswerType,
    setShowCheckAnswer,
    setModalActive,
    word,
    setWord,
  } = useOutletContext<cardGameType>();

  const [visibility, setVisibility] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);

  const { questions } = useOutletContext<currentAnswerAndQuestions>();

  const current = useSelector(selectCurrent);

  const question = questions[current];

  const count = useCountWord();
  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(() => {
    const savedStatuses = sessionStorage.getItem(ANSWER_STATUS);
    if (savedStatuses) return JSON.parse(savedStatuses);
    return Array(count).fill(PENDING);
  });

  useEffect(() => {
    sessionStorage.setItem(ANSWER_STATUS, JSON.stringify(answerStatuses));
  }, [answerStatuses]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const blurActiveElement = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleBackspaceUnified = useCallback(() => {
    blurActiveElement();
    handleBackspace(setWord);
  }, [setWord]);

  useEffect(() => {
    const correct = Number(sessionStorage.getItem(CORRECT)) || 0;
    const wrong = Number(sessionStorage.getItem(WRONG)) || 0;
    const current = Number(sessionStorage.getItem(LAST_INDEX)) || 0;

    dispatch(hydrateFromStorage({ correct, wrong, current }));
  }, [dispatch]);

  useEffect(() => {
    if (questions.length === 0) return;

    const answerStatuses = JSON.parse(
      sessionStorage.getItem(ANSWER_STATUS) || "[]",
    );
    const isLastQuestion = current === questions.length - 1;
    const lastAnswered = answerStatuses[current];

    if (
      isLastQuestion &&
      (lastAnswered === SUCCESS || lastAnswered === ERROR)
    ) {
      navigate("/game/result");
    }

    if (current >= questions.length) {
      navigate("/game/result");
    }
  }, [current, questions, navigate]);

  useEffect(() => {
    sessionStorage.setItem(CURRENT_GAME, location.pathname);
  }, [location.pathname]);

  const checkAnswer = useCallback(() => {
    blurActiveElement();

    if (!word) {
      setVisibility(true);
      return;
    }

    setVisibility(false);

    const isCorrect = word === question.correctAnswer;

    setCheckAnswerType(isCorrect ? SUCCESS : ERROR);

    const newStatuses = [...answerStatuses];
    newStatuses[current] = isCorrect ? SUCCESS : ERROR;

    sessionStorage.setItem(ANSWER_STATUS, JSON.stringify(newStatuses));

    setAnswerStatuses(newStatuses);
    setShowCheckAnswer(true);
    setModalActive(true);
  }, [
    word,
    question.correctAnswer,
    current,
    answerStatuses,
    setVisibility,
    setCheckAnswerType,
    setShowCheckAnswer,
    setModalActive,
    setAnswerStatuses,
  ]);

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer();
    }

    // 🔹 Забороняємо пробіл
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      handleBackspaceUnified();
      return;
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [checkAnswer, handleBackspaceUnified]);

  return (
    <>
      <div className={s.boxModel}>
        {question && (
          <CardGame
            question={question}
            answerStatusesWrite={answerStatuses}
            setShowMotivation={setShowMotivation}
          />
        )}

        <div className={s.inputContainer}>
          <input
            type="text"
            value={word}
            readOnly
            className={`${s.gameInput} ${visibility && s.borderInput}`}
          />
        </div>
      </div>

      <Keyboard
        onKeyPress={(e) => handleKeyPress(e, setWord)}
        onBackspace={handleBackspaceUnified}
        onEnter={checkAnswer}
      />

      {question && (
        <BaseButtonGame
          word={word}
          setVisibility={setVisibility}
          setShowCheckAnswer={setShowCheckAnswer}
          setCheckAnswerType={setCheckAnswerType}
          setModalActive={setModalActive}
          correctAnswer={question.correctAnswer}
          answerStatuses={answerStatuses}
          setAnswerStatuses={setAnswerStatuses}
          current={current}
        />
      )}

      {showMotivation && (
        <MotivationModal onClose={() => setShowMotivation(false)} />
      )}
    </>
  );
};

export default WriteGame;
