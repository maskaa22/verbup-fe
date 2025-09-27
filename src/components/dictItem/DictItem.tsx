import { useState } from "react";
import type { Props } from "../../utils/dict/dictTypes";
import css from "./DictItem.module.css";
import clsx from "clsx";
import { speakWordsIndividually } from "../../utils/dict/dictSound";


const DictItem: React.FC<Props> = ({
  word: { base_form, past_simple, past_participle, uk },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const handleSound = () => {
    // const wordList = `${base_form} ${past_simple} ${past_participle}`;
    const wordList = [base_form, past_simple, past_participle]
    setIsSpeaking(true);
    speakWordsIndividually(wordList, true, 1500);
    setTimeout(() => setIsSpeaking(false), 3000);
  };
  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.wordWrap}>
      <div className={css.bsWrap}>
        <div className={css.dotWrap}>
          <span></span>
          <div className={css.baseForm}>
            <p onClick={() => speakWordsIndividually([base_form], true, 1500)}>{base_form}</p>
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
          <p onClick={() => speakWordsIndividually([past_simple], true, 1500)}>{past_simple}</p>
          <p onClick={() => speakWordsIndividually([past_participle], true, 1500)}>{past_participle}</p>
        </div>
      )}
    </div>
  );
};

export default DictItem;
