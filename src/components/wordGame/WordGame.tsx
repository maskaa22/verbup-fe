import { useNavigate, useOutletContext } from "react-router-dom";
import c from "./WordGame.module.css";
import CardGame from "../cardGame/CardGame";
import React, { useEffect } from "react";
import type { currentAnswerAndQuestions } from "../../utils/gameType";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../redux/game/selectors";
import { ANSWER_STATUS, ERROR, SUCCESS } from "../../constants";

const WordGame: React.FC = () => {
  const { questions } = useOutletContext<currentAnswerAndQuestions>();

  const current = useSelector(selectCurrent);

  const question = questions[current];

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length === 0) return;

    const answerStatuses = JSON.parse(
      sessionStorage.getItem(ANSWER_STATUS) || "[]"
    );
    const isLastQuestion = current === questions.length - 1;
    const lastAnswered = answerStatuses[current];

    // якщо поточне питання — останнє і вже на нього відповіли
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
