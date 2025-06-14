import s from "./BaseButtonGame.module.css";

const BaseButtonGame = ({
  word,
  setCheckAnswerType,
  setShowCheckAnswer,
  setModalActive,
}) => {
  //логіка перевірки на правильність відповіді
  const handleCheckAnswer = () => {
    if (word === "flew") {
      setCheckAnswerType("success");
    } else {
      setCheckAnswerType("error");
    }
    setShowCheckAnswer(true);
    setModalActive(true);
  };

  return (
    <>
      <div className={s.btnContainer}>
        <button className={s.btn} onClick={handleCheckAnswer}>
          Перевірити
        </button>
      </div>
    </>
  );
};

export default BaseButtonGame;
