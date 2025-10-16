import React, { useState } from "react";
import s from "./BaseComponentGame.module.css";
import QuestionProgressBar from "../questionProgressBar/QuestionProgressBar";
import type { baseComponentType, modalType } from "../../utils/gameType";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { resetCurrent } from "../../redux/game/slice";
import { useDispatch } from "react-redux";
import { ANSWER_STATUS, CORRECT, LAST_INDEX, MOTIVATION_SHOW, WRONG } from "../../constants";
import { useSelector } from "react-redux";
import { selectGameSetting } from "../../redux/game/selectors";
import { speakText } from "../../utils/voiseFunction";

const BaseComponentGame: React.FC<baseComponentType> = ({
  current,
  img,
  question,
  answerStatuses,
  count,
  translate,
}) => {
  const { setModalActive } = useOutletContext<modalType>();

  const [voice, setVoice] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { verbForm } = useSelector(selectGameSetting);

  const location = useLocation();

  const voiceFunction = () => {
    setVoice(true);
    speakText(question);
  };

  return (
    <>
      <div
        className={`${s.topContainer} ${
          location.pathname === "/game/write-word" ? s.writeWord : ""
        }`}
      >
        <button
          className={s.close}
          onClick={() => {
            sessionStorage.removeItem(ANSWER_STATUS);
            sessionStorage.removeItem(LAST_INDEX);
            sessionStorage.removeItem(CORRECT);
            sessionStorage.removeItem(WRONG);
            sessionStorage.removeItem(MOTIVATION_SHOW);

            setModalActive(false);
            dispatch(resetCurrent());
            navigate("/game");
          }}
        >
          <svg className={s.icon}>
            <use href={"/icons.svg#icon-close"}></use>
          </svg>
        </button>
        <p className={s.current}>
          {current + 1} з {count}
        </p>
      </div>
      <QuestionProgressBar
        total={count}
        currentIndex={current}
        answerStatuses={answerStatuses}
      />
      <div className={s.imgContainer}>
        <img src={img} className={s.img} />
      </div>

      <p className={s.translate}>{translate}</p>

      <p className={s.title}>
        Choose the correct {verbForm.toLowerCase()} of{" "}
        <span className={s.word}>
          {question}{" "}
          {location.pathname === "/game/write-word" && (
            <svg
              className={`${s.voice} ${voice && s.speaking}`}
              onClick={voiceFunction}
            >
              <use href="/icons.svg#icon-sound"></use>
            </svg>
          )}
        </span>
      </p>
    </>
  );
};

export default BaseComponentGame;
