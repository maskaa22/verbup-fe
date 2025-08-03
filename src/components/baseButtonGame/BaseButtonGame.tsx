import { ERROR, SUCCESS } from "../../constants";
import type { baseButtonType } from "../../utils/gameType";
import s from "./BaseButtonGame.module.css";

const BaseButtonGame: React.FC<baseButtonType> = ({
  word,
  setCheckAnswerType,
  setShowCheckAnswer,
  setModalActive,
  correctAnswer,
  answerStatuses,
  setAnswerStatuses,
  current,
  setIsChecked,
  setVisibility,
}) => {

const handleCheckAnswer = () => {
  if (!word) {
    setVisibility(true);
    return;
  }
  setVisibility(false);

  if (word === correctAnswer) {
    setCheckAnswerType(SUCCESS);
  } else {
    setCheckAnswerType(ERROR);
  }

  const newStatuses = [...answerStatuses];
  const isCorrect = word === correctAnswer;
  newStatuses[current] = isCorrect ? SUCCESS : ERROR;

  localStorage.setItem("answerStatuses", JSON.stringify(newStatuses));

  if (current + 1 < newStatuses.length) {
    localStorage.setItem("lastAnsweredIndex", (current + 1).toString());
  } else {
    localStorage.removeItem("lastAnsweredIndex");
  }

  setAnswerStatuses(newStatuses);
  setShowCheckAnswer(true);
  setModalActive(true);
  setIsChecked(true);
};

  return (
    <div className={s.btnContainer}>
      <button className={s.btn} onClick={handleCheckAnswer}>
        Перевірити
      </button>
    </div>
  );
};

export default BaseButtonGame;
