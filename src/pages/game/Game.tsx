import s from "./Game.module.css";
import { useState } from "react";
import CheckAnswer from "../../components/checkAnswer/CheckAnswer.js";
import { Outlet } from "react-router-dom";
import GameOptions from "../../components/gameOptions/GameOptions.js";

const Game = () => {
  const [current, setCurrent] = useState(0);

  const [checkAnswerType, setCheckAnswerType] = useState("");
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);

  const [modalActive, setModalActive] = useState(false);

  const [questions, setQuestions] = useState([]);

  return (
    <div className={s.baseContainer}>
      <GameOptions setQuestions={setQuestions} />

      <Outlet
        context={{
          current,
          setCurrent,
          checkAnswerType,
          setCheckAnswerType,
          showCheckAnswer,
          setShowCheckAnswer,
          modalActive,
          setModalActive,
          questions,
        }}
      />

      {showCheckAnswer && checkAnswerType && (
        <CheckAnswer
          type={checkAnswerType}
          setCurrent={setCurrent}
          active={modalActive}
          setActive={setModalActive}
        />
      )}
    </div>
  );
};

export default Game;
