import type { Props } from "../../utils/dict/dictTypes";
import { speakText } from "../../utils/voiseFunction";
import css from "./DictItem.module.css";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";



const DictItem: React.FC<Props> = ({
  word: { base_form, past_simple, past_participle, uk },
}) => {
  const wordList = `${base_form} ${past_simple} ${past_participle}` 
const handleSound = (word: string) => {
  console.log("sound")
  speakText(word, true)
}
  return (
    <Accordion className={css.wordWrap}>
      <AccordionItem style={{width: "100%"}}
        header={({ state: { isEnter } }) => (
          <div className={css.bsWrap}>
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
            <svg
              className={css.arrow}
              style={{
                transform: isEnter ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.3s",
              }}
            >
              <use href="./icons.svg#icon-accordion-arrow"></use>
            </svg>
          </div>
        )}
        buttonProps={{ className: css.customButton }}
      >
        <div className={css.irrForm}>
          <p>{past_simple}</p>
          <p>{past_participle}</p>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default DictItem;

{
  /* <div className={css.dictItem}>
      <div onClick={handleShowForms} className={css.baseForm}>
        <p>{base_form}</p>
        <p>{uk}</p>
      </div>
      <div className={clsx(css.irrForm, hideForms && css.hidden)}>
        <p>{past_simple}</p>
        <p>{past_participle}</p>
      </div>
      <div onClick={handleShowForms}>+</div>
    </div> */
}
