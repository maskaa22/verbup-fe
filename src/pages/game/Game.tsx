import s from "./Game.module.css";
import React, { useEffect, useState } from "react";
import CheckAnswer from "../../components/checkAnswer/CheckAnswer.js";
import { Outlet } from "react-router-dom";
import GameOptions from "../../components/gameOptions/GameOptions.js";
import { useDispatch } from "react-redux";
import { generateQuestions, getWords } from "../../redux/game/operations.js";
import { useSelector } from "react-redux";
import { selectGameSetting, selectQueries } from "../../redux/game/selectors.js";
import type { AppDispatch } from "../../redux/store.js";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

const Game: React.FC = () => {
  const [checkAnswerType, setCheckAnswerType] = useState("");
  const [showCheckAnswer, setShowCheckAnswer] = useState(false);

  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector(selectQueries);
  const login = useSelector(selectIsLoggedIn);
  const setting = useSelector(selectGameSetting);

  // console.log(login);
  
  

  useEffect(() => {
    // dispatch(generateQuestions());
    dispatch(getWords(setting))
  }, [dispatch]);

  return (
    <div className={s.baseContainer}>
      <GameOptions />

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
