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
  // const count = useCountWord();

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
            <p className={type === SUCCESS ? `${c.title} ${c.success}` : `${c.title} ${c.error}`}>
              {type === SUCCESS ? "Правильно" : "Нажаль не вірно"}
            </p>
            <p className={type === SUCCESS ? `${c.text} ${c.success}` : `${c.text} ${c.error}`}>
              {type === SUCCESS
                ? "Ти дуже наполегливий"
                : "В наступний раз все вийде"}
            </p>
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
            <svg
              width="16"
              height="32"
              viewBox="0 0 16 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.26932 8.77332L4.68398 7.35999L12.3893 15.0627C12.5135 15.1861 12.6121 15.3328 12.6794 15.4945C12.7466 15.6562 12.7813 15.8296 12.7813 16.0047C12.7813 16.1798 12.7466 16.3531 12.6794 16.5148C12.6121 16.6765 12.5135 16.8232 12.3893 16.9467L4.68398 24.6533L3.27065 23.24L10.5026 16.0067L3.26932 8.77332Z"
                fill="#303131"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckAnswer;
