import css from "./GameSettingRadio.module.css"
type RadioGroupProps = {
  name: string
  options: string[]
  onChange: (value: string) => void
  selectedValue?: string
}
const GameSettingRadio: React.FC<RadioGroupProps> = ({ name, options, onChange, selectedValue }) => {
return <div className={css.rset}>{options.map((option) => (
        <label className={css.label} key={option}>
          <input className={css.input}
            type="radio"
            name={name}
            value={option}
            // checked={selectedValue === option}
            onChange={() => { console.log(option); onChange(option)}}
          />
          {option}
        </label>
      ))}</div>
}

export default GameSettingRadio;


