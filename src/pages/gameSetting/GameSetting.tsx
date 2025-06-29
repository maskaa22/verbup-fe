import { useEffect, useState } from "react";
import GameSettingRadio from "../../components/gameSettingRadio/GameSettingRadio";
import css from "./GameSetting.module.css";
import BaseButtonStart from "../../components/baseButtonStart/BaseButtonStart";



const GameSetting = () => {
  const [formData, setFormData] = useState({
  level: '',
  verbForm: '',
  numQuest: ''
})
useEffect(()=> {console.log(formData)}, [formData])
  return <div className={css.div}>
    <h1>Обирай свій режим тренування</h1>
    <p className={css.warning}>Будь уважний(на)! Якщо у тебе немає кабінету, твій прогрес не буде збережено.</p>
    <div className={css.form}>
    <p>Вибір рівня знань</p>
    <GameSettingRadio
  name="level"
  options={['Begginer', 'Intermediate', 'Advanced']}
  selectedValue={formData.level}
  onChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
  needSpan={false}
/>
    <p>Вибір режиму гри</p>
    <GameSettingRadio
  name="verbForm"
  options={['Past Simple', 'Past Participle', 'Змішаний']}
  selectedValue={formData.verbForm}
  onChange={(value) => setFormData(prev => ({ ...prev, verbForm: value }))}
  needSpan={true}
/>
    <p>Вибір кількості питань у грі</p>
    <GameSettingRadio
  name="numQuest"
  options={['5 питань', '10 питань', '20 питань']}
  selectedValue={formData.numQuest}
  onChange={(value) => { console.log(value); setFormData(prev => ({ ...prev, numQuest: value }))}}
  needSpan={false}
/>
</div>
<BaseButtonStart label="Далі"/>
  </div>;
};

export default GameSetting;

//['Past Simple (V2)', 'Past Participle (V3)', 'Змішаний (V2, V3)']