import c from "./ResultGame.module.css";
import Star from "../../components/star/Star";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGameSetting } from "../../redux/game/selectors";
import { useDispatch } from "react-redux";
import { baseQuestion, resetCurrent } from "../../redux/game/slice";
import { generateQuestions } from "../../redux/game/operations";

const ResultGame = () => {
  const navigation = useNavigate();
  const gameSetting = useSelector(selectGameSetting);

  const numQuest = gameSetting.numQuest;
  const count = Number(numQuest.split(" ")[0]);
  const dispatch = useDispatch();

  const home = () => {
    navigation("/");
  };
  const next = async () => {
    try {
      dispatch(baseQuestion());
      dispatch(resetCurrent());
      await dispatch(generateQuestions()).unwrap(); // Генерує нові
      navigation(`/game/check-word?count=${count}`);
    } catch (error) {
      console.error("Помилка при генерації питань:", error);
    }
  };
  return (
    <div className={c.rezult}>
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
            <p>8</p>
          </li>
          <li className={c.item}>
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-no"}></use>
            </svg>
            <p>2</p>
          </li>
          <li className={c.item}>
            <svg className={c.icon}>
              <use href={"/icons.svg#icon-star"}></use>
            </svg>
            <p>56</p>
          </li>
        </ul>
        <Star onRate={(value) => console.log("Обрано:", value)} />
      </div>
      <div className={c.btnContainer}>
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
