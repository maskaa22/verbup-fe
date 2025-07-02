import { Field } from "formik";
import css from "./FormInput.module.css"

interface Props {
  name: string
  type?: string
  placeholder?: string
  icon: string
}

const FormInput: React.FC<Props> = ({ name, type = 'text', placeholder = 'input', icon }) => {
return <div className={css.inputWrap}>
          <Field className={css.input} id={name} type={type} name={name} placeholder={placeholder} />
          <svg className={css.icon}>
            <use href={`./icons.svg#${icon}`}></use>
          </svg>
        </div>
}

export default FormInput;