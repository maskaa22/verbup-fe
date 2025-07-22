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
  //логіка перевірки на правильність відповіді
  const handleCheckAnswer = () => {
    if (!word) {
      setVisibility(true);
      return;
    }
    if (word === correctAnswer) {
      setVisibility(false);
      setCheckAnswerType(SUCCESS);
    } else {
      setVisibility(false);
      setCheckAnswerType(ERROR);
    }
    const newStatuses = [...answerStatuses];
    const isCorrect = word === correctAnswer;
    newStatuses[current] = isCorrect ? SUCCESS : ERROR;
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
