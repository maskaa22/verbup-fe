import { useState } from "react";
import GameSettingRadio from "../../components/gameSettingRadio/GameSettingRadio";
import css from "./GameSetting.module.css";
import BaseButtonStart from "../../components/baseButtonStart/BaseButtonStart";
import { useDispatch } from "react-redux";
import { setSetting } from "../../redux/game/slice";
import { ADVANCED, BEGGINER, INTERMEDIATE } from "../../constants";

const GameSetting = () => {
  const [formData, setFormData] = useState({
    level: BEGGINER,
    verbForm: "Past Simple",
    numQuest: "",
  });

  const dispatch = useDispatch();

  const saveGameSetting = () => {
    dispatch(setSetting(formData));
  };

  return (
    <div className={css.div}>
      <h2 className={css.title}>Обирай свій режим тренування</h2>
      <p className={css.warning}>
        Будь уважний(на)! Якщо у тебе немає кабінету, твій прогрес не буде
        збережено.
      </p>
      <div className={css.form}>
        <p>Вибір рівня знань</p>
        <GameSettingRadio
          name="level"
          options={[BEGGINER, INTERMEDIATE, ADVANCED]}
          selectedValue={formData.level}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, level: value }))
          }
          needSpan={false}
          disabled={true}
        />
        <p>Вибір режиму гри</p>
        <GameSettingRadio
          name="verbForm"
          options={["Past Simple", "Past Participle", "Змішаний"]}
          selectedValue={formData.verbForm}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, verbForm: value }))
          }
          needSpan={true}
          disabled={true}
        />
        <p>Вибір кількості питань у грі</p>
        <GameSettingRadio
          name="numQuest"
          options={["5 питань", "10 питань", "20 питань"]}
          selectedValue={formData.numQuest}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, numQuest: value }));
          }}
          needSpan={false}
          disabled={false}
        />
      </div>
      <BaseButtonStart label="Зберегти" onClick={() => saveGameSetting()} />
    </div>
  );
};

export default GameSetting;
