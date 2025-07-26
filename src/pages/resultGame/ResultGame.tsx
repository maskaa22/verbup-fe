import c from "./ResultGame.module.css";
// import Star from "../../components/star/Star";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCorrect,
  selectGameSetting,
  selectWrong,
} from "../../redux/game/selectors";
import { useDispatch } from "react-redux";
import { baseQuestion, resetCurrent } from "../../redux/game/slice";
import { generateQuestions } from "../../redux/game/operations";
import type { AppDispatch } from "../../redux/store";
// import { useState } from "react";
// import Feedback from "../../components/feedback/Feedback";
import Confetti from "../../components/confetti/Confetti";

const ResultGame = () => {
  const navigation = useNavigate();
  const gameSetting = useSelector(selectGameSetting);
  const correct = useSelector(selectCorrect);
  const wrong = useSelector(selectWrong);

  const numQuest = gameSetting.numQuest;
  const count = Number(numQuest.split(" ")[0]);
  const dispatch: AppDispatch = useDispatch();

  // const [rating, setRating] = useState<number>(0);

  const resetSetting = () => {
    dispatch(baseQuestion());
    dispatch(resetCurrent());
  };

  const home = () => {
    resetSetting();
    navigation("/");
  };

  const next = async () => {
    try {
      resetSetting();
      await dispatch(generateQuestions()).unwrap();
      navigation(`/game/check-word?count=${count}`);
    } catch (error) {
      console.error("Помилка при генерації питань:", error);
    }
  };

  return (
    <div className={c.rezult}>
      <Confetti />
      <div className={c.innerContainer}>
        <h3 className={c.title}>Тренування завершено</h3>
        <img src={"/image/game/planet-rezult.png"} className={c.img} />
        <p className={c.text}>
          Супер! Твої дієслова прокачались на новий рівень
        </p>
        <ul className={c.list}>
          <li className={c.item}>
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-yes"}></use>
            </svg>
            <p>{correct}</p>
          </li>
          <li className={c.item}>
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-no"}></use>
            </svg>
            <p>{wrong}</p>
          </li>
          {/* <li className={c.item}>
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-star"}></use>
            </svg>
            <p>56</p>
          </li> */}
        </ul>
        {/* <Star setRating={setRating} rating={rating} />
        {rating > 0 && <Feedback />} */}
      </div>
      {/* <div className={`${c.btnContainer} ${rating ? `${c.rating}` : ""}`}> */}
      <div className={`${c.btnContainer}`}>
        <button onClick={home} className={c.btn}>
          На головну
        </button>
        <button onClick={next} className={c.btn}>
          Грати далі
        </button>
      </div>
    </div>
  );
};

export default ResultGame;
