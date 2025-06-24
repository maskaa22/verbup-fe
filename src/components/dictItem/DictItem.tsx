import { useState } from "react";
import css from "./DictItem.module.css";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";

import clsx from "clsx";

interface Props {
  word: {
    base_form: string;
    past_simple: string;
    past_participle: string;
    uk: string;
  };
}

const DictItem: React.FC<Props> = ({
  word: { base_form, past_simple, past_participle, uk },
}) => {
  const [hideForms, setHideForms] = useState(true);
  const handleShowForms = () => {
    setHideForms(!hideForms);
  };
  return (
    <Accordion>
      <AccordionItem
        header={({ state: { isEnter } }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className={css.baseForm}>
              <p>{base_form}</p>
              <p>{uk}</p>
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
