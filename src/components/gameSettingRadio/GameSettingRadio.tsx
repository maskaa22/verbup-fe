import clsx from "clsx"
import css from "./GameSettingRadio.module.css"
type RadioGroupProps = {
  name: string
  options: string[]
  onChange: (value: string) => void
  selectedValue?: string
  needSpan: boolean
}


const GameSettingRadio: React.FC<RadioGroupProps> = ({ name, options, onChange, selectedValue, needSpan }) => {

  const verbFrom = ['(V2)', '(V3)', '(V2, V3)' ];
return <div className={css.rset}>{options.map((option, index) => (
        <div className={ clsx(css.inputWrap, selectedValue === option && css.inputWrapChecked ) }>
        <label htmlFor={option} className={css.label} key={option}><span className={css.text}>{option}</span>
          {needSpan && <span>{verbFrom[index]}</span> } 
        </label>
          <input id={option} className={css.input}
            type="radio"
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={() => { console.log(option); onChange(option)}}
          />
        </div>
      ))}</div>
}

export default GameSettingRadio;


