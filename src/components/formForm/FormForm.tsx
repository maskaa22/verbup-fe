import { Formik, Form, type FormikHelpers } from "formik";
import FormInput from "../formInput/FormInput";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";
import css from "./FormForm.module.css"
import type { NameField } from "../../utils/formTypes";


interface Props<T>{
arrOfNames: NameField[]
  onSubmit: (values: T, actions: FormikHelpers<T>) => void
}


const FormForm = <T extends Record<string, any>> ({arrOfNames, onSubmit}: Props<T>) => {
   
    const initialValues = arrOfNames.reduce((acc, el) => {
  acc[el.name as keyof T] = '' as T[keyof T];
  return acc;
}, {} as T);
return (<Formik
  initialValues={initialValues}
  onSubmit={onSubmit}
>
  <Form className={css.form}>
    {arrOfNames.map(({label, name, type, placeholder, icon }) => 
    (<div key={name}>
        <label htmlFor={name}>{label}</label>
    <FormInput name={name} type={type} placeholder={placeholder} icon={icon} />
    </div>) )}
    <BaseButtonStart label="Далі"/>
  </Form>
</Formik>)
}

export default FormForm;