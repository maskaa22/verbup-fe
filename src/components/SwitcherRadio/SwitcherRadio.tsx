import clsx from "clsx";
import css from "./SwitcherRadio.module.css"
const SwitcherRadio = ({
  name,
  options,
  onChange,
  selectedValue,
  needSpan,
  disabled,
}) => {
return <div className={css.wrap}>
 <label className={css.switch}>
           <input
                       id={option}
                       className={css.input}
                       type="radio"
                       name={name}
                       value={option}
                       checked={selectedValue === option}
                       onChange={() => onChange(option)}
                       disabled={disabled}
                     />
            <span className={clsx(css.slider, css.round) }></span>
        </label>
</div>
};

export default SwitcherRadio;