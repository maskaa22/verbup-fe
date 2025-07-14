import { useState } from "react";
import type { Props } from "../../utils/dict/dictTypes";
import { speakText } from "../../utils/voiseFunction";
import css from "./DictItem.module.css";

const DictItem: React.FC<Props> = ({
  word: { base_form, past_simple, past_participle, uk },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wordList = `${base_form} ${past_simple} ${past_participle}`;
  const handleSound = (word: string) => speakText(word, true);
  const handleToggle = () => setIsOpen(!isOpen)
  return ( <div className={css.dictItem}>
    <div onClick={(e) => e.stopPropagation()} className={css.bsWrap}>
        <div className={css.dotWrap}>
          <span></span>
          <div className={css.baseForm}>
            <p>{base_form}</p>
            <p>{uk}</p>
          </div>
        </div>
        <div onClick={() => handleSound(wordList)} className={css.soundBtn}>
          <svg className={css.sound}>
            <use href="./icons.svg#icon-sound"></use>
          </svg>
        </div>
        <div onClick={() => handleToggle()}>
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
      {isOpen && <div className={css.irrForm}>
      <p>{past_simple}</p>
      <p>{past_participle}</p>
    </div>}
      </div>
  );
};

export default DictItem;

