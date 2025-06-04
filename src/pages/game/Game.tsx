import { useState } from "react";
import Keyboard from "../../components/keyboard/Keyboard";
import s from "./Game.module.css";
import QuestionProgressBar from "../../components/questionProgressBar/QuestionProgressBar";

const Game = () => {
  const [text, setText] = useState("");
  const [current, setCurrent] = useState(0);
  const totalQuestions = 10;

  const handleKeyPress = (value: string) => {
    setText((prev) => prev + value);
  };

  const handleBackspace = () => {
    setText((prev) => prev.slice(0, -1));
  };

  const handleEnter = () => {
    alert("Submitted: " + text);
    setText("");
  };

  return (
    <div className={s.container}>
      <div className={s.boxModel}>
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
          <p className={s.current}>{current+1} з {totalQuestions}</p>
        </div>
        <QuestionProgressBar total={totalQuestions} currentIndex={current} />
        <div className={s.imgContainer}>
          <img src="/image/game/car.png" />
        </div>

        <p className={s.title}>Which is the Past participle (V3) of “go”?</p>
        <div className={s.inputContainer}>
          <input type="text" value={text} readOnly className={s.gameInput} />
        </div>
      </div>
      <Keyboard
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
      />
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
    </div>
  );
};

export default Game;
