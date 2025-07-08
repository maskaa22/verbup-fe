import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectGameSetting } from "../../redux/game/selectors";
import type React from "react";
import GameSettingType from "../gameSettingType/GameSettingType";
import LogoIntro from "../logoIntro/LogoIntro";

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
        <div style={{marginBottom: "50px"}}>
        <LogoIntro/>
        </div>
          <GameSettingType
            icon={"/icons.svg#icon-text"}
            text={"Тестуйся граючи - неправильні дієслова стануть легкими"}
            title={"VerbTest"}
            path={"/image/text.png"}
            count={count}
            gameType={"check-word"}
          />
          <GameSettingType
            icon={"/icons.svg#icon-spell"}
            text={"Літера за літерою - зберіть правильне дієслово"}
            title={"VerbSpell"}
            path={"/image/spell.png"}
            count={count}
            gameType={"spell-word"}
          />
          <GameSettingType
            icon={"/icons.svg#icon-tense"}
            text={"Впиши правильне дієслово - склади речення без помилок"}
            title={"VerbTense"}
            path={"/image/tense.png"}
            count={count}
            gameType={"write-word"}
          />
        </>
      )}
    </>
  );
};

export default GameOptions;
