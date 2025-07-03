
import c from "./ResultGame.module.css";
import Star from "../../components/star/Star";

const ResultGame = () => {
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
    </div>
  );
};

export default ResultGame;
