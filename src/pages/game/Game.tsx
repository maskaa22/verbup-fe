import s from "./Game.module.css";
import { useEffect, useState } from "react";
import CheckAnswer from "../../components/checkAnswer/CheckAnswer.js";
import { Outlet } from "react-router-dom";
import GameOptions from "../../components/gameOptions/GameOptions.js";
import { useDispatch } from "react-redux";
import { generateQuestions } from "../../redux/game/operations.js";
import { useSelector } from "react-redux";
import { selectQueries } from "../../redux/game/selectors.js";

const Game = () => {
  const [current, setCurrent] = useState(0);

  const [checkAnswerType, setCheckAnswerType] = useState("");
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);

  const [modalActive, setModalActive] = useState(false);

  // const [questions, setQuestions] = useState([]);

   const dispatch = useDispatch();
   const questions = useSelector(selectQueries);

   useEffect(() => {
    dispatch(generateQuestions());
  }, [dispatch]);

  return (
    <div className={s.baseContainer}>
      <GameOptions  />

      <Outlet
        context={{
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
          active={modalActive}
          setActive={setModalActive}
        />
      )}
    </div>
  );
};

export default Game;
