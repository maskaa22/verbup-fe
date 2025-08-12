import { CORRECT, ERROR, LAST_INDEX, SUCCESS, WRONG } from "../../constants";
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
import { useEffect } from "react";

const CheckAnswer: React.FC<checkAnswerType> = ({
  type,
  active,
  setActive,
}) => {
  const dispatch = useDispatch();
  const current = useSelector(selectCurrent);
  const correct = useSelector(selectCorrect);
  const wrong = useSelector(selectWrong);

  const handleNextQuestion = () => {
    const updatedIndex = current + 1;

    dispatch(setCurrent(updatedIndex));
    sessionStorage.setItem(LAST_INDEX, updatedIndex.toString());

    setActive(false);
  };

  useEffect(() => {
    if (!active) return;

    const lastSaved = Number(sessionStorage.getItem(LAST_INDEX) || "-1");

    if (lastSaved === current) return;

    const isSuccess = type === SUCCESS;

    const updatedCorrect = isSuccess ? correct + 1 : correct;
    const updatedWrong = !isSuccess ? wrong + 1 : wrong;

    dispatch(setCorrect(updatedCorrect));
    dispatch(setWrong(updatedWrong));
    sessionStorage.setItem(CORRECT, updatedCorrect.toString());
    sessionStorage.setItem(WRONG, updatedWrong.toString());

    sessionStorage.setItem(LAST_INDEX, current.toString());
  }, [active, correct, current, dispatch, type, wrong]);

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
          <div className={c.checkContainer}>
            {type === SUCCESS ? (
              <img src="/image/success.png" alt={SUCCESS} />
            ) : (
              <img src="/image/error.png" alt={ERROR} />
            )}
            <div>
              <p
                className={
                  type === SUCCESS
                    ? `${c.title} ${c.success}`
                    : `${c.title} ${c.error}`
                }
              >
                {type === SUCCESS ? "Правильно" : "На жаль не вірно"}
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

          <button className={c.btn} onClick={() => handleNextQuestion()}>
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
