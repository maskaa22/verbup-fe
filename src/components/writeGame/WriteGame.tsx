import { useState } from "react";
import s from "./WriteGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import Keyboard from "../keyboard/Keyboard";
import { handleBackspace, handleKeyPress } from "../../utils/gameFunctions";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useOutletContext } from "react-router-dom";
import type { allGameType } from "../../utils/gameType";

const WriteGame = () => {
  const { setCheckAnswerType, setShowCheckAnswer, current, setModalActive } =
    useOutletContext<allGameType>();

  const [text, setText] = useState("");

  const imgWrite = "/image/game/car.png";

  return (
    <>
      <div className={s.boxModel}>
        <BaseComponentGame
          current={current}
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

      <BaseButtonGame
        word={text}
        setShowCheckAnswer={setShowCheckAnswer}
        setCheckAnswerType={setCheckAnswerType}
        setModalActive={setModalActive}
      />
    </>
  );
};

export default WriteGame;
