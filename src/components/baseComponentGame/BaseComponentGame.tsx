import React from "react";
import s from "./BaseComponentGame.module.css";
import QuestionProgressBar from "../questionProgressBar/QuestionProgressBar";
import type { baseComponentType } from "../../utils/type";

const BaseComponentGame: React.FC<baseComponentType> = ({
  current,
  totalQuestions,
  img,
  question,
}) => {
  return (
    <>
      <div className={s.topContainer}>
        <button className={s.close}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.95 15.75L7.875 9.675L1.8 15.75L0 13.95L6.075 7.875L0 1.8L1.8 0L7.875 6.075L13.95 0L15.75 1.8L9.675 7.875L15.75 13.95L13.95 15.75Z"
              fill="black"
            />
          </svg>
        </button>
        <p className={s.current}>
          {current + 1} з {totalQuestions}
        </p>
      </div>
      <QuestionProgressBar total={totalQuestions} currentIndex={current} />
      <div className={s.imgContainer}>
        <img src={img} />
      </div>

      <p className={s.title}>{question}</p>
    </>
  );
};

export default BaseComponentGame;
