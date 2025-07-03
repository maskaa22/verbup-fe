import { useNavigate, useOutletContext } from "react-router-dom";
import c from "./WordGame.module.css";

import CardGame from "../cardGame/CardGame";
import { useEffect } from "react";
import type { currentAnswerAndQuestions } from "../../utils/gameType";

const WordGame = () => {
  const { questions, current } = useOutletContext<currentAnswerAndQuestions>();

  const question = questions[current];

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length > 0 && current >= questions.length) {
      navigate("/game/result");
    }
  }, [current, questions, navigate]);

  return (
    <div className={c.gameContainer}>
      {/* <div className="container"> */}
        {question && <CardGame question={question} />}
      {/* </div> */}
    </div>
  );
};

export default WordGame;
