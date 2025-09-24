import c from "./ResultGame.module.css";
// import Star from "../../components/star/Star";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  // selectCorrect,
  selectGameSetting,
  // selectWrong,
} from "../../redux/game/selectors";
import { useDispatch } from "react-redux";
import { baseQuestion, resetCurrent } from "../../redux/game/slice";
import { generateQuestions } from "../../redux/game/operations";
import type { AppDispatch } from "../../redux/store";
// import Feedback from "../../components/feedback/Feedback";
import Confetti from "../../components/confetti/Confetti";
import { CORRECT, ANSWER_STATUS, LAST_INDEX, WRONG } from "../../constants";
import { useEffect, useState } from "react";
import Star from "../../components/star/Star";
import Feedback from "../../components/feedback/Feedback";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import type { currentAnswerAndQuestions } from "../../utils/gameType";
import api from "../../api/axios";

const ResultGame = () => {
  const navigation = useNavigate();
  const gameSetting = useSelector(selectGameSetting);

  // const correctRedux = useSelector(selectCorrect);
  // const wrongRedux = useSelector(selectWrong);

  const correctLS = Number(sessionStorage.getItem(CORRECT)) || 0;
  const wrongLS = Number(sessionStorage.getItem(WRONG)) || 0;

  // const correct = correctRedux ?? correctLS;
  // const wrong = wrongRedux ?? wrongLS;

  const numQuest = gameSetting.numQuest;
  const count = Number(numQuest.split(" ")[0]);
  const dispatch: AppDispatch = useDispatch();

  const isLogin = useSelector(selectIsLoggedIn);
  const { questions } = useOutletContext<currentAnswerAndQuestions>();

  const [rating, setRating] = useState<number>(0);


   useEffect(() => {
    if (!isLogin) return;

    const sendProgress = async () => {
      try {
        console.log(questions);
        const words = questions.map((q) => ({
          wordId: q.id, 
          type:
            (gameSetting.verbForm === "Past Simple" && "ps") ||
            (gameSetting.verbForm === "Past Participle" && "pp"),
          status: q.correctAnswer ? "studied" : "mistake", 
        }));

        console.log(words);
        

        await api.post("/progress", { words });
        console.log("Прогрес відправлено:", words);
      } catch (error) {
        console.error("Помилка збереження прогресу:", error);
      }
    };

    sendProgress();
  }, [isLogin, questions, gameSetting]);

  const resetSetting = () => {
    sessionStorage.removeItem(CORRECT);
    sessionStorage.removeItem(WRONG);
    sessionStorage.removeItem(LAST_INDEX);
    sessionStorage.removeItem(ANSWER_STATUS);

    dispatch(baseQuestion());
    dispatch(resetCurrent());
  };

  const home = () => {
    resetSetting();
    navigation(isLogin ? "/home" : "/");
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
        <h3 className={c.title}>
          {!isLogin ? "Твій прогрес не зберігається" : "Тренування завершено"}
        </h3>
        <img src={"/image/game/planet-rezult.png"} className={c.img} />
        <p className={c.text}>
          {correctLS === 0
            ? "Наступний раз - вийде!"
            : "Супер! Твої дієслова прокачались на новий рівень"}
        </p>
        <ul className={c.list}>
          <li className={c.item}>
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-yes"}></use>
            </svg>
            <p>{correctLS}</p>
          </li>
          <li className={c.item}>
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-no"}></use>
            </svg>
            <p>{wrongLS}</p>
          </li>
          {/* <li className={c.item}>
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-star"}></use>
            </svg>
            <p>56</p>
          </li> */}
        </ul>
        <Star setRating={setRating} rating={rating} />
        {rating > 0 && <Feedback rating={rating}/>}
      </div>
      <div className={`${c.btnContainer} ${rating ? `${c.rating}` : ""}`}>
        <div className={`${c.btnContainer}`}>
          <button onClick={home} className={c.btn}>
            На головну
          </button>

          <button onClick={next} className={c.btn}>
            Грати далі
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultGame;
