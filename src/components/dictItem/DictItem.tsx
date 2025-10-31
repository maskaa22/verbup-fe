import { useState } from "react";
import type { Props } from "../../utils/dict/dictTypes";
import css from "./DictItem.module.css";
import clsx from "clsx";
import { speakWordsIndividually } from "../../utils/dict/dictSound";
import { useSelector } from "react-redux";
import { selectProgress } from "../../redux/auth/selectors";


const DictItem: React.FC<Props> = ({
  word: { basic, pastSimple, pastParticiple, uk },
}) => {
  // const progress = useSelector(selectProgress)
  // const psLearnt = progress?.progressPs.find(word => word.word.basic === basic)
    // const ppLearnt = progress?.progressPp.find(word => word.word.basic === basic)

  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const handleSound = () => {
    // const wordList = `${basic} ${pastSimple} ${pastParticiple}`;
    const wordList = [basic, pastSimple, pastParticiple]
    setIsSpeaking(true);
    speakWordsIndividually(wordList, true, 1500);
    setTimeout(() => setIsSpeaking(false), 3000);
  };
  const handleToggle = () => setIsOpen(!isOpen);
  return (
    <div className={css.wordWrap}>
      <div className={css.bsWrap}>
        <div className={css.dotWrap}>
          <span className={css.dot}></span>
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
          <div className={css.dotWrap}>
          <span className={`${css.dot} ${psLearnt && css.learnt}`}></span>
          <p onClick={() => speakWordsIndividually([pastSimple], true, 1500)}>{pastSimple}</p></div>
          <div className={css.dotWrap}>
          <span className={css.dot}></span>
          <p onClick={() => speakWordsIndividually([pastParticiple], true, 1500)}>{pastParticiple}</p></div>
        </div>
      )}
    </div>
  );
};

export default DictItem;
