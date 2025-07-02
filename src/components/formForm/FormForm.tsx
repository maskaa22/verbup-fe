import { Formik, Form } from "formik";
import FormInput from "../formInput/FormInput";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";
import css from "./FormForm.module.css"

interface NameField {
label: string
name: string
type?: string
placeholder?: string
icon: string[]
}
interface Props{
arrOfNames: NameField[]
  onSubmit: React.Dispatch<React.SetStateAction<boolean>>  
}
const FormForm: React.FC<Props> = ({arrOfNames, onSubmit}) => {
return (<Formik
  initialValues={{ current: '', new: '', repeat: '' }}
  onSubmit={(values) => {console.log(values); onSubmit(true)}}
>
  <Form className={css.form}>
    {arrOfNames.map(({label, name, type, placeholder, icon }) => 
    (<div key={name}>
        <label htmlFor={name}>{label}</label>
    <FormInput name={name} type={type} placeholder={placeholder} icon={icon[0]} />
    </div>) )}
    <BaseButtonStart label="Далі"/>
  </Form>
</Formik>)
}

export default FormForm;