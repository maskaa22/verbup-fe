import { useState } from "react";
import s from "./WriteGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import Keyboard from "../keyboard/Keyboard";
import { handleBackspace, handleKeyPress } from "../../utils/gameFunctions";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useOutletContext } from "react-router-dom";
import type { AnswerStatus, cardGameType } from "../../utils/gameType";
import { useCountWord } from "../../hooks/gameHooks";

const WriteGame = () => {
  const { setCheckAnswerType, setShowCheckAnswer, current, setModalActive } =
    useOutletContext<cardGameType>();

  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const imgWrite = "/image/game/car.png";
  const count = useCountWord();
  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(
    Array(count).fill("pending")
  );
  console.log(isChecked, visibility);

  return (
    <>
      <div className={s.boxModel}>
        <BaseComponentGame
          current={current}
          img={imgWrite}
          question={"Which is the Past participle (V3) of “go”?"}
          answerStatuses={answerStatuses}
          count={count}
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
        setVisibility={setVisibility}
        setShowCheckAnswer={setShowCheckAnswer}
        setCheckAnswerType={setCheckAnswerType}
        setModalActive={setModalActive}
        correctAnswer={"question.correctAnswer"}
        answerStatuses={answerStatuses}
        setAnswerStatuses={setAnswerStatuses}
        current={current}
        setIsChecked={setIsChecked}
      />
    </>
  );
};

export default WriteGame;
