import { Formik, Form, Field, type FormikHelpers } from "formik";
import css from "./SigninForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";


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
        <div className={css.inputwrap}>
        <Field type="email" name="email" className={css.input} placeholder="E-mail" autoComplete="off" />
        {/* <label htmlFor="email" className={css.label}>Email</label> */}
        </div>
        <div className={css.inputwrap}>
        <Field type={visible ? "text" : "password"} name="password" className={css.input} placeholder="Password" autoComplete="off"/>
        {/* <label htmlFor="password" className={css.label}>Password</label> */}
        <span className={css.eye} onClick={() => setVisible(!visible)} >{visible ? "hide" : "show"}</span>
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