import { Formik, Form, Field, type FormikHelpers } from "formik";
import css from "./SigninForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";
import FormInput from "../formInput/FormInput";


export interface LogFormValues {
email: string,
password: string,
}
const SigninForm = () => {
const [visible, setVisible] = useState(false)

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: LogFormValues, actions: FormikHelpers<LogFormValues>): void => {
    dispatch(login(values));
    actions.resetForm();
  };
  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <FormInput  name={"email"} type={"email"} placeholder={"your@email.com"} icon={"icon-email"}/>
        <label htmlFor="password">Пароль</label>
        <div className={css.inputwrap}>
        <Field type={visible ? "text" : "password"} name="password" className={css.input} autoComplete="off"/>
        <span className={css.password}>
          <svg className={css.icon}>
                      <use href="./icons.svg#icon-password"></use>
                    </svg>
                    <svg className={css.icon}>
                      <use href="./icons.svg#icon-password-star"></use>
                    </svg>
          </span>
          
        {/* <label htmlFor="password" className={css.label}>Password</label> */}
        <span className={css.eye} onClick={() => setVisible(!visible)} >
          <svg className={css.icon}>
                      <use href={`./icons.svg#${visible ? "icon-password-see" : "icon-password-see"}`}></use>
                    </svg>
          </span>
        </div>
        <Link className={css.forgotPassword} to="/">Забули пароль?</Link>
        <BaseButtonStart label="Увійти"/>
      </Form>
    </Formik>
  );
}

export default SigninForm;

//{"username": "Fine",
//     "email": "missFine@gmail.com",
//     "password": "missFine@gmail.com"
// }

// {
//     "message": "Registration successful",
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE3NTAyMjc3NDYsImV4cCI6MTc1MDIyODY0Nn0.SmKvlxlAhey1E6WnnRt_2-p5__i2p7SSN_HQDWrLfqI"
// }