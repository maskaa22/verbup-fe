import { ERROR, ANSWER_STATUS, LAST_INDEX, SUCCESS } from "../../constants";
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
  setText,
  setVoice
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

    sessionStorage.setItem(ANSWER_STATUS, JSON.stringify(newStatuses));

    if (current + 1 < newStatuses.length) {
      sessionStorage.setItem(LAST_INDEX, (current + 1).toString());
    } else {
      sessionStorage.removeItem(LAST_INDEX);
    }

    setAnswerStatuses(newStatuses);
    setShowCheckAnswer(true);
    setModalActive(true);
    setIsChecked?.(true);
    setText?.('');
    setVoice?.(false)
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
