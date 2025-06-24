import { useNavigate, useOutletContext } from "react-router-dom";
import c from "./WordGame.module.css";

import CardGame from "../cardGame/CardGame";
import { useEffect, useState } from "react";

const WordGame = () => {
  const { questions, current } = useOutletContext();

  const question = questions[current];

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length > 0 && current >= questions.length) {
      navigate("/game/result");
    }
  }, [current, questions, navigate]);

  return (
    <div className="container">
      {question && <CardGame question={question} />}
    </div>
  );
};

export default WordGame;
