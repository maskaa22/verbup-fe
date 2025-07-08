import React from "react";
import s from "./BaseComponentGame.module.css";
import QuestionProgressBar from "../questionProgressBar/QuestionProgressBar";
import type { baseComponentType } from "../../utils/gameType";
import { useNavigate } from "react-router-dom";
import { useCountWord } from "../../hooks/gameHooks";

const BaseComponentGame: React.FC<baseComponentType> = ({
  current,
  img,
  question,
}) => {
  const navigate = useNavigate();

  const count = useCountWord();

  return (
    <>
      <div className={s.topContainer}>
        <button className={s.close} onClick={() => navigate("/game")}>
          <svg className={s.icon}>
            <use href={"/icons.svg#icon-close"}></use>
          </svg>
        </button>
        <p className={s.current}>
          {current + 1} з {count}
        </p>
      </div>
      <QuestionProgressBar total={count} currentIndex={current} />
      <div className={s.imgContainer}>
        <img src={img} />
      </div>

      <p className={s.title}>{question}</p>
    </>
  );
};

export default BaseComponentGame;
