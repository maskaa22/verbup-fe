import { useCallback, useEffect, useState } from "react";
import s from "./WriteGame.module.css";

import Keyboard from "../keyboard/Keyboard";
import {
  handleBackspace,
  handleKeyPress,
} from "../../utils/gameFunctions";

import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import {
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import type {
  AnswerStatus,
  cardGameType,
  currentAnswerAndQuestions,
} from "../../utils/gameType";

import { useCountWord } from "../../hooks/gameHooks";
import { useSelector, useDispatch } from "react-redux";
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

  const { questions } =
    useOutletContext<currentAnswerAndQuestions>();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const current = useSelector(selectCurrent);

  const question =
    current < questions.length
      ? questions[current]
      : null;

  const count = useCountWord();

  const [visibility, setVisibility] = useState(false);
  const [showMotivation, setShowMotivation] =
    useState(false);

  const [answerStatuses, setAnswerStatuses] =
    useState<AnswerStatus[]>(() => {
      const saved = sessionStorage.getItem(
        ANSWER_STATUS
      );
      if (saved) return JSON.parse(saved);
      return Array(count).fill(PENDING);
    });


  useEffect(() => {
    sessionStorage.setItem(
      ANSWER_STATUS,
      JSON.stringify(answerStatuses)
    );
  }, [answerStatuses]);

  useEffect(() => {
    const correct =
      Number(sessionStorage.getItem(CORRECT)) || 0;
    const wrong =
      Number(sessionStorage.getItem(WRONG)) || 0;
    const currentIndex =
      Number(sessionStorage.getItem(LAST_INDEX)) || 0;

    dispatch(
      hydrateFromStorage({
        correct,
        wrong,
        current: currentIndex,
      })
    );
  }, [dispatch]);


  useEffect(() => {
    if (!questions.length) return;

    if (current >= questions.length) {
      navigate("/game/result");
    }
  }, [current, questions, navigate]);


  useEffect(() => {
    sessionStorage.setItem(
      CURRENT_GAME,
      location.pathname
    );
  }, [location.pathname]);

  const blurActiveElement = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleBackspaceUnified =
    useCallback(() => {
      blurActiveElement();
      handleBackspace(setWord);
    }, [setWord]);

  const checkAnswer = useCallback(() => {

    if (!question) {
      navigate("/game/result");
      return;
    }

    blurActiveElement();

    if (!word) {
      setVisibility(true);
      return;
    }

    setVisibility(false);

    const isCorrect =
      word === question.correctAnswer;

    setCheckAnswerType(
      isCorrect ? SUCCESS : ERROR
    );

    const newStatuses = [...answerStatuses];
    newStatuses[current] = isCorrect
      ? SUCCESS
      : ERROR;

    setAnswerStatuses(newStatuses);

    setShowCheckAnswer(true);
    setModalActive(true);
  }, [
    question,
    word,
    current,
    answerStatuses,
    setCheckAnswerType,
    setShowCheckAnswer,
    setModalActive,
    navigate,
  ]);

  //  Keyboard listener
  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Enter") {
        e.preventDefault();
        checkAnswer();
      }

      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspaceUnified();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [checkAnswer, handleBackspaceUnified]);

  return (
    <>
      <div className={s.boxModel}>
        {question && (
          <CardGame
            question={question}
            answerStatusesWrite={
              answerStatuses
            }
            setShowMotivation={
              setShowMotivation
            }
          />
        )}

        <div className={s.inputContainer}>
          <input
            type="text"
            value={word}
            readOnly
            className={`${s.gameInput} ${
              visibility ? s.borderInput : ""
            }`}
          />
        </div>
      </div>

      {question && (
        <>
          <Keyboard
            onKeyPress={(e) =>
              handleKeyPress(e, setWord)
            }
            onBackspace={
              handleBackspaceUnified
            }
            onEnter={checkAnswer}
          />

          <BaseButtonGame
            word={word}
            setVisibility={setVisibility}
            setShowCheckAnswer={
              setShowCheckAnswer
            }
            setCheckAnswerType={
              setCheckAnswerType
            }
            setModalActive={
              setModalActive
            }
            correctAnswer={
              question.correctAnswer
            }
            answerStatuses={
              answerStatuses
            }
            setAnswerStatuses={
              setAnswerStatuses
            }
            current={current}
          />
        </>
      )}

      {showMotivation && (
        <MotivationModal
          onClose={() =>
            setShowMotivation(false)
          }
        />
      )}
    </>
  );
};

export default WriteGame;