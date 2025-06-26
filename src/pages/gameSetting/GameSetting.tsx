import { useState } from "react";
import GameSettingRadio from "../../components/gameSettingRadio/GameSettingRadio";
import css from "./GameSetting.module.css";
import BaseButtonStart from "../../components/baseButtonStart/BaseButtonStart";



const GameSetting = () => {
  const [formData, setFormData] = useState({
  level: '',
  verbForm: '',
  numQuest: ''
})

  return <div className={css.div}>
    <h1>Обирай свій режим тренування</h1>
    <p className={css.warning}>Будь уважний(на)! Якщо у тебе немає кабінету, твій прогрес не буде збережено.</p>
    <div className={css.form}>
    <p>Вибір рівня знань</p>
    <GameSettingRadio
  name="level"
  options={['Begginer', 'Intermediate', 'Advanced']}
  onChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
/>
    <p>Вибір режиму гри</p>
    <GameSettingRadio
  name="verbForm"
  options={['Past Simple (V2)', 'Past Participle (V2)', 'Змішаний (V2, V3)']}
  selectedValue={formData.verbForm}
  onChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
/>
    <p>Вибір кількості питань у грі</p>
    <GameSettingRadio
  name="numQuest"
  options={['5 питань', '10 питань', '20 питань']}
  onChange={(value) => { console.log(value); setFormData(prev => ({ ...prev, language: value }))}}
/>
</div>
<BaseButtonStart label="Далі"/>
  </div>;
};

export default GameSetting;
