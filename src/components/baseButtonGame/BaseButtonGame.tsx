import React from "react";
import s from "./BaseButtonGame.module.css";

const BaseButtonGame = ({totalQuestions, setCurrent}) => {
  return (
    <div className={s.btnContainer}>
      <button
        className={s.btn}
        onClick={() =>
          setCurrent((prev) => Math.min(prev + 1, totalQuestions - 1))
        }
      >
        Перевірити
      </button>
    </div>
  );
};

export default BaseButtonGame;
