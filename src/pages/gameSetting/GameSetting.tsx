import { useEffect, useState } from "react";
import GameSettingRadio from "../../components/gameSettingRadio/GameSettingRadio";
import css from "./GameSetting.module.css";
import BaseButtonStart from "../../components/baseButtonStart/BaseButtonStart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectGameSetting } from "../../redux/game/selectors";
import { setSetting } from "../../redux/game/slice";
import { ADVANCED, BEGGINER, INTERMEDIATE } from "../../constants";

const GameSetting = () => {
  const [formData, setFormData] = useState({
    level: "",
    verbForm: "",
    numQuest: "",
  });

  const dispatch = useDispatch();
  // const gameSetting = useSelector(selectGameSetting);

  const saveGameSetting = () => {
    // console.log(formData, '111');
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
        />
      </div>
      <BaseButtonStart label="Зберегти" onClick={() => saveGameSetting()} />
    </div>
  );
};

export default GameSetting;

//['Past Simple (V2)', 'Past Participle (V3)', 'Змішаний (V2, V3)']
