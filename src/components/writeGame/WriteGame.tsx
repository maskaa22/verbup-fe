import React, { useState } from "react";
import s from "./WriteGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import Keyboard from "../keyboard/Keyboard";
import { handleBackspace, handleKeyPress } from "../../utils/gameFunctions";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";

const WriteGame = () => {
  const [text, setText] = useState("");
  const [current, setCurrent] = useState(0);
  const totalQuestions = 10;

  const imgWrite = "/image/game/car.png";

  return (
    <>
      <div className={s.boxModel}>
        <BaseComponentGame
          current={current}
          totalQuestions={totalQuestions}
          img={imgWrite}
          question={"Which is the Past participle (V3) of “go”?"}
        />
        <div className={s.inputContainer}>
          <input type="text" value={text} readOnly className={s.gameInput} />
        </div>
      </div>

      <Keyboard
        onKeyPress={(e) => handleKeyPress(e, setText)}
        onBackspace={() => handleBackspace(setText)}
      />
      
      <BaseButtonGame totalQuestions={totalQuestions} setCurrent={setCurrent}/>
    </>
  );
};

export default WriteGame;
