import { useOutletContext } from "react-router-dom";
import c from "./WordGame.module.css";

import CardGame from "../cardGame/CardGame";

const WordGame = () => {
  const { questions, current } = useOutletContext();

  const question = questions[current];
  if (!question) return <p>Loading...</p>; // або "Кінець гри", якщо current >= questions.length

  return (
    <div className="container">
      <CardGame question={question} />
    </div>
  );
};

export default WordGame;
