import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGameSetting } from "../../redux/game/selectors";
import type React from "react";
import GameSettingType from "../gameSettingType/GameSettingType";
import c from "./GameOptions.module.css";

const GameOptions: React.FC = () => {
  const location = useLocation();

  const hideSelect = location.pathname !== "/game";

  const gameSetting = useSelector(selectGameSetting);

  const numQuest = gameSetting.numQuest;
  const count = Number(numQuest.split(" ")[0]);

  return (
    <>
      {!hideSelect && (
        <>
          <div className={c.innerContainer}>
          <GameSettingType
            icon={"/icons.svg#icon-text"}
            text={"Тестуйся граючи - неправильні дієслова стануть легкими"}
            title={"VerbTest"}
            path={"/image/text.png"}
            count={count}
            gameType={"check-word"}
            disabled={false}
          />
          <GameSettingType
            icon={"/icons.svg#icon-spell"}
            text={"Літера за літерою - зберіть правильне дієслово"}
            title={"VerbSpell"}
            path={"/image/repair.png"}
            count={count}
            gameType={"spell-word"}
            disabled={true}
          />
          <GameSettingType
            icon={"/icons.svg#icon-tense"}
            text={"Впиши правильне дієслово - склади речення без помилок"}
            title={"VerbTense"}
            path={"/image/text.png"}
            count={count}
            gameType={"write-word"}
            disabled={false}
          />
          </div>
        </>
      )}
    </>
  );
};

export default GameOptions;
