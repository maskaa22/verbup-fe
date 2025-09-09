import { Formik, Form, type FormikHelpers } from "formik";
import css from "./RegistraterForm.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { register } from "../../redux/auth/operations";
import type { RegFormValues } from "../../utils/formTypes";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";
import FormInput from "../formInput/FormInput";
import FormInputPassword from "../formInputPassword/FormInputPassword";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const handleSubmit = async (
    values: RegFormValues,
    actions: FormikHelpers<RegFormValues>
  ): void => {
   const res = await dispatch(register(values));
   if(register.fulfilled.match(res)){
    actions.resetForm();
    navigate('/home')
   }
    
  };
  return  <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <FormInput label="Ім'я" name="username" type="text" placeholder="Введіть ваше ім'я" icon="icon-user"/>
        <FormInput label="E - mail" name="email" type="email" placeholder="your@email.com" icon="icon-email"/>
        <FormInputPassword isFor="reg" label="Пароль"/>
        <BaseButtonStart label="Зарееструватися"/>
      </Form>
    </Formik> ;
};

export default RegisterForm;




