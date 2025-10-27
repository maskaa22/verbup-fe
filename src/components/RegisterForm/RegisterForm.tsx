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
// import { selectIsError } from "../../redux/auth/selectors";
// import { useSelector } from "react-redux";
import * as Yup from 'yup';
import { useState } from "react";
import ErrorMes from "../errorMes/ErrorMes";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your nick-name"),
  email: Yup.string()
      .email("This is not a valid email address")
      .required("Please enter your email"),
      password: Yup.string().min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol').required("Please enter your password")
})

const RegisterForm: React.FC = () => {
  const [emailInUse, setEmailInUse] = useState(false)
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  // const error = useSelector(selectIsError)
  
  const handleSubmit = async (
    values: RegFormValues,
    actions: FormikHelpers<RegFormValues>
  ): Promise<void> => {
   const res = await dispatch(register(values));
   if(register.fulfilled.match(res)){
    actions.resetForm();
    navigate('/verify-email')
   }else{
    setEmailInUse(true)
   }
    
  };
  return  <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={RegisterSchema}
    >
      <Form className={css.form}>
        <FormInput label="Ім'я" name="username" type="text" placeholder="Введіть ваше ім'я" icon="icon-user"/>
        <FormInput label="E - mail" name="email" type="email" placeholder="your@email.com" icon="icon-email"/>
        <FormInputPassword isFor="reg" label="Пароль" placeholder="Мінімум 8 символів"/>
        <BaseButtonStart label="Зарееструватися"/>
        {emailInUse && (
          <ErrorMes
            message={"wrongPassword"}
            onClose={() => setEmailInUse(false)}
          />
        )}
      </Form>
    </Formik> ;
};

export default RegisterForm;




