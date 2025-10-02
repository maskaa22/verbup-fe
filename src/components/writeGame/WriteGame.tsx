import { useEffect, useState } from "react";
import s from "./WriteGame.module.css";
// import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import Keyboard from "../keyboard/Keyboard";
import { handleBackspace, handleKeyPress } from "../../utils/gameFunctions";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { AnswerStatus, cardGameType, currentAnswerAndQuestions } from "../../utils/gameType";
import { useCountWord } from "../../hooks/gameHooks";
import { useSelector } from "react-redux";
import { selectCurrent } from "../../redux/game/selectors";
import CardGame from "../cardGame/CardGame";
import { ANSWER_STATUS, CORRECT, ERROR, LAST_INDEX, SUCCESS, WRONG } from "../../constants";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { hydrateFromStorage } from "../../redux/game/slice";

const WriteGame = () => {
  const { setCheckAnswerType, setShowCheckAnswer, setModalActive } =
    useOutletContext<cardGameType>();

  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const { questions } = useOutletContext<currentAnswerAndQuestions>();


  const current = useSelector(selectCurrent);

  const question = questions[current];

  
  const count = useCountWord();
  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>(() => {
  const savedStatuses = sessionStorage.getItem(ANSWER_STATUS);
  if (savedStatuses) return JSON.parse(savedStatuses);
  return Array(count).fill("pending");
});

useEffect(() => {
  sessionStorage.setItem(ANSWER_STATUS, JSON.stringify(answerStatuses));
}, [answerStatuses]);
  
  // console.log(isChecked, visibility);

// const imgWrite = `/image/game/${question.basic}.png`;

  const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

 useEffect(() => {
    const correct = Number(sessionStorage.getItem(CORRECT)) || 0;
    const wrong = Number(sessionStorage.getItem(WRONG)) || 0;
    const current = Number(sessionStorage.getItem(LAST_INDEX)) || 0;

    dispatch(hydrateFromStorage({ correct, wrong, current }));
  }, [dispatch]);

  useEffect(() => {
    if (questions.length === 0) return;

    const answerStatuses = JSON.parse(
      sessionStorage.getItem(ANSWER_STATUS) || "[]"
    );
    const isLastQuestion = current === questions.length - 1;
    const lastAnswered = answerStatuses[current];

    if (
      isLastQuestion &&
      (lastAnswered === SUCCESS || lastAnswered === ERROR)
    ) {
      navigate("/game/result");
    }

    if (current >= questions.length) {
      navigate("/game/result");
    }
  }, [current, questions, navigate]);
console.log(answerStatuses);

  return (
    <>
      <div className={s.boxModel}>
        {question && <CardGame question={question} answerStatusesWrite={answerStatuses}/>}
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
        setText={setText}
      />
    </>
  );
};

export default WriteGame;
