import { useState } from "react";
import s from "./WriteGame.module.css";
// import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import Keyboard from "../keyboard/Keyboard";
import { handleBackspace, handleKeyPress } from "../../utils/gameFunctions";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useOutletContext } from "react-router-dom";
import type { AnswerStatus, cardGameType, currentAnswerAndQuestions } from "../../utils/gameType";
import { useCountWord } from "../../hooks/gameHooks";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../redux/game/selectors";
import CardGame from "../cardGame/CardGame";

const WriteGame = () => {
  const { setCheckAnswerType, setShowCheckAnswer, setModalActive } =
    useOutletContext<cardGameType>();

  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const { questions } = useOutletContext<currentAnswerAndQuestions>();
// console.log(questions);

  const current = useSelector(selectCurrent);

  const question = questions[current];

  
  const count = useCountWord();
  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(
    Array(count).fill("pending")
  );
  // console.log(isChecked, visibility);

// const imgWrite = `/image/game/${question.basic}.png`;
  return (
    <>
      <div className={s.boxModel}>
        {question && <CardGame question={question} />}
        {/* <BaseComponentGame
          current={current}
          img={imgWrite}
          question={question.question}
          answerStatuses={answerStatuses}
          count={count}
           translate={question.translate}
        /> */}
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
        correctAnswer={question.correctAnswer}
        answerStatuses={answerStatuses}
        setAnswerStatuses={setAnswerStatuses}
        current={current}
        setIsChecked={setIsChecked}
      />
    </>
  );
};

export default WriteGame;
