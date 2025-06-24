import { ERROR, SUCCESS } from "../../constants";
import { useCountWord } from "../../hooks/gameHooks";
import type { checkAnswerType } from "../../utils/gameType";
import c from "./CheckAnswer.module.css";

const CheckAnswer = ({
  type,
  setCurrent,
  active,
  setActive,
}: checkAnswerType) => {
  const count = useCountWord();

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
          {type === SUCCESS ? (
            <img src="/image/success.png" alt="Success" />
          ) : (
            <img src="/image/error.png" alt="Error" />
          )}
          <div>
            <p className={c.title}>
              {type === SUCCESS ? "Правильно" : "Нажаль не вірно"}
            </p>
            <p className={c.text}>
              {type === SUCCESS
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
            // setCurrent((prev) => Math.min(prev + 1, count - 1));
            setCurrent((prev) => prev + 1);

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
