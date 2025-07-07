import { useNavigate, useOutletContext } from "react-router-dom";
import c from "./WordGame.module.css";
import CardGame from "../cardGame/CardGame";
import React, { useEffect } from "react";
import type { currentAnswerAndQuestions } from "../../utils/gameType";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../redux/game/selectors";

const WordGame: React.FC = () => {
  const { questions } = useOutletContext<currentAnswerAndQuestions>();

  const current = useSelector(selectCurrent);

  const question = questions[current];

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length === 0) return;
    if (questions.length > 0 && current >= questions.length) {
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
