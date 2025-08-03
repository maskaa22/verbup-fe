import { Field } from "formik";
import css from "./FormInput.module.css"
import type { FromInputProps } from "../../utils/formTypes";



const FormInput: React.FC<FromInputProps> = ({ label, name, type = 'text', placeholder = 'input', icon }) => {
return <div>  
  <label htmlFor="name">{label}</label>
<div className={css.inputWrap}>

          <Field className={css.input} id={name} type={type} name={name} placeholder={placeholder} />
          <svg className={css.icon}>
            <use href={`./icons.svg#${icon}`}></use>
          </svg>
        </div>
        </div>
}

export default FormInput;