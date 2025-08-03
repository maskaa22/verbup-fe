import React from "react";
import s from "./BaseComponentGame.module.css";
import QuestionProgressBar from "../questionProgressBar/QuestionProgressBar";
import type { baseComponentType, modalType } from "../../utils/gameType";
import { useNavigate, useOutletContext } from "react-router-dom";
import { resetCurrent } from "../../redux/game/slice";
import { useDispatch } from "react-redux";
import { ANSWER_STATUS, CORRECT, LAST_INDEX, WRONG } from "../../constants";

const BaseComponentGame: React.FC<baseComponentType> = ({
  current,
  img,
  question,
  answerStatuses,
  count,
}) => {
  const { setModalActive } = useOutletContext<modalType>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div className={s.topContainer}>
        <button
          className={s.close}
          onClick={() => {
            localStorage.removeItem(ANSWER_STATUS);
            localStorage.removeItem(LAST_INDEX);
            localStorage.removeItem(CORRECT);
            localStorage.removeItem(WRONG);

            setModalActive(false);
            dispatch(resetCurrent());
            navigate("/game");
          }}
        >
          <svg className={s.icon}>
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

      <p className={s.title}>
        Choose the correct past participle of <span>{question}</span>
      </p>
    </>
  );
};

export default BaseComponentGame;
