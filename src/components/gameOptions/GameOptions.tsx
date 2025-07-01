import { useEffect, useState } from "react";
import s from "./GameOptions.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { generateQuestionsList } from "../../utils/game/generateQuestionsList";
import type { gameOptions } from "../../utils/gameType";
import { useSelector } from "react-redux";
import { selectGameSetting } from "../../redux/game/selectors";
import { ADVANCED, BEGGINER, INTERMEDIATE } from "../../constants";
import GameSettingType from "../gameSettingType/GameSettingType";

const GameOptions = ({ setQuestions }: gameOptions) => {
  const [gameType, setGameType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const hideSelect = location.pathname !== "/game";

  const gameSetting = useSelector(selectGameSetting);
  // console.log(gameSetting);
  const numQuest = gameSetting.numQuest;
  const count = Number(numQuest.split(" ")[0]);

  const handleSubmit = () => {
    if (gameType && count) {
      navigate(`/game/${gameType}?count=${count}`);
    }
  };

  useEffect(() => {
    const createQuestions = async () => {
      try {
        const res = await fetch("/data/irr-verbs.filtered.json");
        const fetchQuestions = await res.json();
        if (count > 0) {
          let selectedQuestions = [];
          if (gameSetting.level === BEGGINER) {
            selectedQuestions = generateQuestionsList(
              fetchQuestions.easy,
              count
            );
          } else if (gameSetting.level === INTERMEDIATE) {
            selectedQuestions = generateQuestionsList(
              fetchQuestions.medium,
              count
            );
          } else if (gameSetting.level === ADVANCED) {
            selectedQuestions = generateQuestionsList(
              fetchQuestions.hard,
              count
            );
          }
          setQuestions(selectedQuestions);
        }
        // if (gameSetting.level !== BEGGINER && count > 0)
        // const selectedQuestions = generateQuestionsList(
        //   fetchQuestions.easy,
        //   count
        // );
      } catch (error) {
        console.error("Помилка завантаження JSON:", error);
      }
    };

    createQuestions();
  }, [count, setQuestions, gameSetting.level]);

  return (
    <>
    {
      !hideSelect && (
        <>
         <GameSettingType
        icon={"/icons.svg#icon-text"}
        text={"Тестуйся граючи - неправильні дієслова стануть легкими"}
        title={"VerbTest"}
        path={'/image/text.png'}
        count={count}
        gameType={'check-word'}
      />
      <GameSettingType
        icon={"/icons.svg#icon-spell"}
        text={"Літера за літерою - зберіть правильне дієслово"}
        title={"VerbSpell"}
        path={'/image/spell.png'}
        count={count}
        gameType={'spell-word'}
      />
      <GameSettingType
        icon={"/icons.svg#icon-tense"}
        text={"Впиши правильне дієслово - склади речення без помилок"}
        title={"VerbTense"}
        path={'/image/tense.png'}
        count={count}
        gameType={'write-word'}
      />
        </>
      )
    }
     
   
      {/* {!hideSelect && (
        <>
          <div className={s.select}>
            <p>Оберіть гру:</p>
            <label>
              <input
                type="radio"
                name="gameType"
                value="write-word"
                onChange={(e) => setGameType(e.target.value)}
              />
              Write Game
            </label>
            <label>
              <input
                type="radio"
                name="gameType"
                value="check-word"
                onChange={(e) => setGameType(e.target.value)}
              />
              Check Game
            </label>
          </div>

          <button onClick={handleSubmit} disabled={!gameType}>
            Підтвердити
          </button>
        </>
      )} */}
    </>
  );
};

export default GameOptions;
