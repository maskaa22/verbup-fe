import clsx from "clsx";
import css from "./GameSettingRadio.module.css";
import type { RadioGroupProps } from "../../utils/gameType";
import { verbFrom } from "../../constants";

const GameSettingRadio: React.FC<RadioGroupProps> = ({
  name,
  options,
  onChange,
  selectedValue,
  needSpan,
  disabled,
}) => {
  return (
    <div className={!disabled ? `${css.rset}` : `${css.rset} ${css.disabled}`}>
      {options.map((option, index) => (
        <div
          className={clsx(
            css.inputWrap,
            selectedValue === option && css.inputWrapChecked
          )}
          key={index}
        >
          <label htmlFor={option} className={css.label} key={option}>
            <span className={css.text}>{option}</span>
            {needSpan && <span>{verbFrom[index]}</span>}
          </label>
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
        </div>
      ))}
    </div>
  );
};

export default GameSettingRadio;
