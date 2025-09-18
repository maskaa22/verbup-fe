import { useState } from "react";
import type { Props } from "../../utils/dict/dictTypes";
import css from "./DictItem.module.css";
import clsx from "clsx";
import { speakWordsIndividually } from "../../utils/dict/dictSound";


const DictItem: React.FC<Props> = ({
  word: { basic, pastSimple, pastParticiple, uk },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const handleSound = () => {
    // const wordList = `${basic} ${pastSimple} ${pastParticiple}`;
    const wordList = [basic, pastSimple, pastParticiple]
    setIsSpeaking(true);
    speakWordsIndividually(wordList, true, 1500);
    setTimeout(() => setIsSpeaking(false), 2500);
  };
  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.wordWrap}>
      <div className={css.bsWrap}>
        <div className={css.dotWrap}>
          <span></span>
          <div className={css.baseForm}>
            <p>{basic}</p>
            <p>{uk}</p>
          </div>
        </div>
        <div onClick={() => handleSound()} className={css.soundBtn}>
          <svg className={clsx(css.sound, isSpeaking && css.speaking)}>
            <use href="./icons.svg#icon-sound"></use>
          </svg>
        </div>
        <div onClick={() => handleToggle()} className={css.openBtn}>
          <svg
            className={css.arrow}
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.3s",
            }}
          >
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className={css.irrForm}>
          <p>{pastSimple}</p>
          <p>{pastParticiple}</p>
        </div>
      )}
    </div>
  );
};

export default DictItem;
