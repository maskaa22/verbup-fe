import clsx from "clsx";
import css from "./GameSettingRadio.module.css";
import type { RadioGroupProps } from "../../utils/gameType";
import { verbFrom } from "../../constants";
import Tooltip from "../tooltip/Tooltip";

const GameSettingRadio: React.FC<RadioGroupProps> = ({
  name,
  options,
  onChange,
  selectedValue,
  needSpan,
  disabled,
  disabledOption,
}) => {
  return (
    <div className={clsx(css.rset, disabled && css.disabled)}>
      {options.map((option, index) => {
        const isOptionDisabled =
          disabled || (disabledOption ? disabledOption(option) : false);

        const content = (
          <div
            className={clsx(
              css.inputWrap,
              selectedValue === option && css.inputWrapChecked,
              isOptionDisabled && css.inputWrapDisabled
            )}
          >
            <label htmlFor={option} className={css.label}>
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
              disabled={isOptionDisabled}
            />
          </div>
        );

        return isOptionDisabled ? (
          <Tooltip key={option} text="Увійдіть">
            {content}
          </Tooltip>
        ) : (
          <div key={option}>{content}</div>
        );
      })}
    </div>
  );
};

export default GameSettingRadio;
