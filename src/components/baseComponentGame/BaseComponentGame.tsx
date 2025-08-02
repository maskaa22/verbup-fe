import React from "react";
import s from "./BaseComponentGame.module.css";
import QuestionProgressBar from "../questionProgressBar/QuestionProgressBar";
import type { baseComponentType } from "../../utils/gameType";
import { useNavigate } from "react-router-dom";
import { resetCurrent } from "../../redux/game/slice";
import { useDispatch } from "react-redux";

const BaseComponentGame: React.FC<baseComponentType> = ({
  current,
  img,
  question,
  answerStatuses,
  count,
}) => {
  const navigate = useNavigate();

  const word = question.match(/“(.+?)”/)?.[1];

  const dispatch = useDispatch();

  return (
    <>
      <div className={s.topContainer}>
        <button className={s.close} onClick={() => navigate("/game")}>
          <svg
            className={s.icon}
            onClick={() => {
              localStorage.removeItem("answerStatuses");
              dispatch(resetCurrent());
            }}
          >
            <use href={"/icons.svg#icon-close"}></use>
          </svg>
        </button>
        <p className={s.current}>
          {current + 1} з {count}
        </p>
      </div>
      <QuestionProgressBar
        total={count}
        currentIndex={current}
        answerStatuses={answerStatuses}
      />
      <div className={s.imgContainer}>
        <img src={img} className={s.img} />
      </div>

      {/* <p className={s.title}>{question}</p> */}
      <p className={s.title}>
        Choose the correct past participle of <span>{word}</span>
      </p>
    </>
  );
};

export default BaseComponentGame;
