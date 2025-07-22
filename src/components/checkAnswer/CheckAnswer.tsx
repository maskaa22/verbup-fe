import { ERROR, SUCCESS } from "../../constants";
import type { checkAnswerType } from "../../utils/gameType";
import c from "./CheckAnswer.module.css";
import { useDispatch } from "react-redux";
import { setCorrect, setCurrent, setWrong } from "../../redux/game/slice";
import { useSelector } from "react-redux";
import {
  selectCorrect,
  selectCurrent,
  selectWrong,
} from "../../redux/game/selectors";
import type React from "react";

const CheckAnswer: React.FC<checkAnswerType> = ({
  type,
  active,
  setActive,
}) => {
  const dispatch = useDispatch();
  const current = useSelector(selectCurrent);
  const correct = useSelector(selectCorrect);
  const wrong = useSelector(selectWrong);

  return (
    <div
      className={active ? `${c.modal} ${c.active}` : `${c.modal}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={
          type === ERROR ? `${c.check} ${c.error}` : `${c.check} ${c.success}`
        }
      >
        <div className={c.info}>
          <div  className={c.checkContainer}>
            {type === SUCCESS ? (
              <img src="/image/success.png" alt="Success" />
            ) : (
              <img src="/image/error.png" alt="Error" />
            )}
            <div>
              <p
                className={
                  type === SUCCESS
                    ? `${c.title} ${c.success}`
                    : `${c.title} ${c.error}`
                }
              >
                {type === SUCCESS ? "Правильно" : "Нажаль не вірно"}
              </p>
              <p
                className={
                  type === SUCCESS
                    ? `${c.text} ${c.success}`
                    : `${c.text} ${c.error}`
                }
              >
                {type === SUCCESS
                  ? "Ти дуже наполегливий"
                  : "В наступний раз все вийде"}
              </p>
            </div>
          </div>

          <button
            className={c.btn}
            onClick={() => {
              //реалізований прогрес верхній питань
              dispatch(setCurrent(current + 1));

              if (type === SUCCESS) {
                dispatch(setCorrect(correct + 1));
              } else {
                dispatch(setWrong(wrong + 1));
              }

              //закриття модального вікна
              setActive(false);
            }}
          >
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-next-question"}></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckAnswer;
