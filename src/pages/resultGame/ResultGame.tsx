import c from "./ResultGame.module.css";
// import Star from "../../components/star/Star";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGameSetting } from "../../redux/game/selectors";
import { useDispatch } from "react-redux";
import { baseQuestion, resetCurrent } from "../../redux/game/slice";
import { generateQuestions } from "../../redux/game/operations";
import type { AppDispatch } from "../../redux/store";

import Confetti from "../../components/confetti/Confetti";
import {
  CORRECT,
  ANSWER_STATUS,
  LAST_INDEX,
  WRONG,
  MOTIVATION_SHOW,
  CURRENT_GAME,
} from "../../constants";
import { useEffect, useRef, useState } from "react";
import Star from "../../components/star/Star";
import Feedback from "../../components/feedback/Feedback";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import type { SendProgressArgs } from "../../utils/gameType";
import { sendProgress } from "../../redux/progress/operations";
import Modal from "../../components/modal/Modal";
import { selectAllNotifications } from "../../redux/notify/selectors";
import { achievements } from "../../constants/chievements";
import ModalAchivements from "../../components/modalAchivements/ModalAchivements";

const ResultGame = () => {
  const navigation = useNavigate();
  const gameSetting = useSelector(selectGameSetting);
  const notifications = useSelector(selectAllNotifications);

  const correctLS = Number(sessionStorage.getItem(CORRECT)) || 0;
  const wrongLS = Number(sessionStorage.getItem(WRONG)) || 0;

  const numQuest = gameSetting.numQuest;
  const count = Number(numQuest.split(" ")[0]);
  const dispatch: AppDispatch = useDispatch();

  const isLogin = useSelector(selectIsLoggedIn);
  const { questions } = useOutletContext<SendProgressArgs>();

  const [rating, setRating] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newAchievements, setNewAchievements] = useState<number[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const answerStatuses = JSON.parse(
    sessionStorage.getItem(ANSWER_STATUS) || "[]",
  );

  useEffect(() => {
    if (!isLogin) return;
    dispatch(sendProgress({ questions, gameSetting, answerStatuses }));
  }, [isLogin, questions, gameSetting, answerStatuses, dispatch]);

  useEffect(() => {
    if (!notifications.soundEffects) return;
    if (correctLS === 0) return;

    const audio = new Audio("/sounds/fanfare.mp3");
    audio.volume = 0.6;
    audioRef.current = audio;

    audio.play().catch(() => {});

    return () => {
      // 🔥 це виконається при переході на іншу сторінку
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [correctLS, notifications.soundEffects]);

  useEffect(() => {
    const newAch = checkAchievements();

    if (newAch.length > 0) {
      setNewAchievements(newAch);
    }
  }, []);

  const resetSetting = () => {
    sessionStorage.removeItem(CORRECT);
    sessionStorage.removeItem(WRONG);
    sessionStorage.removeItem(LAST_INDEX);
    sessionStorage.removeItem(ANSWER_STATUS);
    sessionStorage.removeItem(MOTIVATION_SHOW);

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

      const lastGame =
        sessionStorage.getItem(CURRENT_GAME) || "/game/check-word";
      navigation(`${lastGame}?count=${count}`);
    } catch (error) {
      console.error("Помилка при генерації питань:", error);
    }
  };

  const checkAchievements = () => {
    const data = JSON.parse(localStorage.getItem("achievements") || "{}");

    const unlocked: number[] = [];

    // 🎯 1. Перша гра
    if (!data[1]) {
      data[1] = true;
      unlocked.push(1);
    }

    // 🎯 2. Без помилок
    if (wrongLS === 0 && correctLS > 0 && !data[8]) {
      data[8] = true;
      unlocked.push(8);
    }

    // 🎯 3. Серія без помилок (приклад)
    if (wrongLS === 0) {
      data[12] = (data[12] || 0) + 1;

      if (data[12] >= 3 && data[12] !== true) {
        data[12] = true;
        unlocked.push(12);
      }
    }

    localStorage.setItem("achievements", JSON.stringify(data));

    return unlocked;
  };

  const currentAchievement = achievements.find(
    (a) => a.id === newAchievements[0],
  );

  return (
    <div className={c.rezult}>
      <Confetti />
      <div className={c.innerContainer}>
        <h3 className={c.title}>Тренування завершено</h3>
        <img src={"/image/game/planet-rezult.png"} className={c.img} />
        <p className={`${c.text} ${!isLogin && c.strongText}`}>
          {correctLS === 0 && isLogin && "Наступний раз - вийде!"}
          {!isLogin &&
            "Увага! Якщо ти не зареєстрований, твій прогрес не зберігається!"}
          {correctLS !== 0 &&
            isLogin &&
            "Супер! Твої дієслова прокачались на новий рівень"}
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
        <p className={c.like}>Сподобалась гра? Оцініть додаток!</p>
        <Star setRating={setRating} rating={rating} />
        {rating > 0 && <Feedback rating={rating} setShowModal={setShowModal} />}
      </div>
      <div className={`${c.btnContainer} ${rating ? `${c.rating}` : ""}`}>
        <button onClick={home} className={c.btn}>
          На головну
        </button>

        <button onClick={next} className={c.btn}>
          Грати далі
        </button>
      </div>

      {showModal && (
        <Modal
          autoClose={2000}
          onClose={() => setShowModal(false)}
          showCloseButton={false}
        >
          <h2 className={c.titleModal}>Дякуємо за відгук!</h2>

          <img src="/image/cool.png" alt="cool" className={c.imgModal} />
          <p className={c.pModal}>
            Ваша думка важлива для нас! З нею ми покращуємось далі...
          </p>
        </Modal>
      )}
      {newAchievements.length > 0 && currentAchievement && (
        <ModalAchivements
          autoClose={5000}
          onClose={() => setNewAchievements([])}
          showCloseButton={false}
        >
          <div className={c.positionWrapper}>
            <img
              src={currentAchievement.icon}
              className={c.imgModalAchiements}
              alt="achievement"
            />

            <div className={c.bgImg}></div>
          </div>

          <div className={c.textWrapper}>
            <p className={c.firstText}>
              Тобі вдалося отримати нове досягнення!
            </p>
            <p className={c.pModal}>{currentAchievement.text}</p>
          </div>
        </ModalAchivements>
      )}
    </div>
  );
};

export default ResultGame;
