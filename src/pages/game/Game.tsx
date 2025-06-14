import s from "./Game.module.css";
import WriteGame from "../../components/writeGame/WriteGame.js";
import WordGame from "../../components/wordGame/WordGame.js";
import { useState } from "react";
import CheckAnswer from "../../components/checkAnswer/CheckAnswer.js";

const Game = () => {
  const [current, setCurrent] = useState(0);

  const [checkAnswerType, setCheckAnswerType] = useState("");
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);

  const [modalActive, setModalActive] = useState(false);

  const totalQuestions = 10;

  return (
    <div className={s.baseContainer}>
      {/* <WriteGame /> */}
      <WordGame
        setCheckAnswerType={setCheckAnswerType}
        setShowCheckAnswer={setShowCheckAnswer}
        current={current}
        totalQuestions={totalQuestions}
        setModalActive={setModalActive}
      />

      {showCheckAnswer && checkAnswerType && (
        <CheckAnswer
          type={checkAnswerType}
          setCurrent={setCurrent}
          totalQuestions={totalQuestions}
          active={modalActive}
          setActive={setModalActive}
        />
      )}
    </div>
  );
};

export default Game;
