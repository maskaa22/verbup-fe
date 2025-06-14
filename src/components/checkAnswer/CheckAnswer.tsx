import React from "react";
import c from "./CheckAnswer.module.css";

const CheckAnswer = ({
  type,
  setCurrent,
  totalQuestions,
  active,
  setActive,
}) => {
  return (
    <div
      className={active ? `${c.modal} ${c.active}` : `${c.modal}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={
          type === "error" ? `${c.check} ${c.error}` : `${c.check} ${c.success}`
        }
      >
        <div className={c.info}>
          {type === "success" ? (
            <img src="/image/success.png" alt="Success" />
          ) : (
            <img src="/image/error.png" alt="Error" />
          )}
          <div>
            <p className={c.title}>
              {type === "success" ? "Правильно" : "Нажаль не вірно"}
            </p>
            <p className={c.text}>
              {type === "success"
                ? "Ти дуже наполегливий"
                : "В наступний раз все вийде"}
            </p>
          </div>
        </div>
        <button
          className={c.btn}
          onClick={() => {
            //має відкритися наступне питання

            //реалізований прогрес верхній питань
            setCurrent((prev) => Math.min(prev + 1, totalQuestions - 1));

            //закриття модального вікна
            setActive(false);
          }}
        >
          Продовжити
        </button>
      </div>
    </div>
  );
};

export default CheckAnswer;
