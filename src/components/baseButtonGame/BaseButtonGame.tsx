import { ERROR, SUCCESS } from "../../constants";
import type { baseButtonType } from "../../utils/gameType";
import s from "./BaseButtonGame.module.css";

const BaseButtonGame: React.FC<baseButtonType> = ({
  word,
  setCheckAnswerType,
  setShowCheckAnswer,
  setModalActive,
  correctAnswer,
}) => {
  //логіка перевірки на правильність відповіді
  const handleCheckAnswer = () => {
    if (!word) return;
    if (word === correctAnswer) {
      setCheckAnswerType(SUCCESS);
    } else {
      setCheckAnswerType(ERROR);
    }

    setShowCheckAnswer(true);
    setModalActive(true);
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
