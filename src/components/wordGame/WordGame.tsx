import { useNavigate, useOutletContext } from "react-router-dom";
import c from "./WordGame.module.css";
import CardGame from "../cardGame/CardGame";
import React, { useEffect } from "react";
import type { currentAnswerAndQuestions } from "../../utils/gameType";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../redux/game/selectors";
import {
  ANSWER_STATUS,
  CORRECT,
  ERROR,
  LAST_INDEX,
  SUCCESS,
  WRONG,
} from "../../constants";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { hydrateFromStorage } from "../../redux/game/slice";

const WordGame: React.FC = () => {
  const { questions } = useOutletContext<currentAnswerAndQuestions>();

  const current = useSelector(selectCurrent);

  const question = questions[current];

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const correct = Number(sessionStorage.getItem(CORRECT)) || 0;
    const wrong = Number(sessionStorage.getItem(WRONG)) || 0;
    const current = Number(sessionStorage.getItem(LAST_INDEX)) || 0;

    dispatch(hydrateFromStorage({ correct, wrong, current }));
  }, [dispatch]);

  useEffect(() => {
    if (questions.length === 0) return;

    const answerStatuses = JSON.parse(
      sessionStorage.getItem(ANSWER_STATUS) || "[]"
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

  return (
    <div className={c.gameContainer}>
      {question && <CardGame question={question} />}
    </div>
  );
};

export default WordGame;
