import { Formik, Form, type FormikHelpers } from "formik";
import css from "./SigninForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import type { AppDispatch } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";
import FormInput from "../formInput/FormInput";
import FormInputPassword from "../formInputPassword/FormInputPassword";
import type { LogFormValues } from "../../utils/formTypes";
import * as Yup from "yup";
import ErrorMes from "../errorMes/ErrorMes";
import { useState } from "react";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("This is not a valid email address")
    .required("Please enter your email"),
  password: Yup.string().min(8).max(60).required("Please enter your password"),
});
const SigninForm = () => {
  const [wrongPassword, setWrongPassword] = useState(false);
  const [status, setStatus] = useState(0)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (
    values: LogFormValues,
    actions: FormikHelpers<LogFormValues>
  ): Promise<void> => {
    const res = await dispatch(login(values));
    if (login.fulfilled.match(res)) {
      navigate("/home");
    }else{
      setStatus(res.payload.status)
      setWrongPassword(true)
    }
    // if (error) {
    //   setWrongPassword(true);
    // }
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={SignInSchema}
    >
      <Form className={css.form}>
        <FormInput
          label={"Email"}
          name={"email"}
          type={"email"}
          placeholder={"your@email.com"}
          icon={"icon-email"}
        />
        <FormInputPassword
          isFor="signin"
          label="Пароль"
          // placeholder={error ? "натисніть “Забули пароль”" : "***********"}
          placeholder="**************"
        />

        <Link className={css.forgotPassword} to="/">
          Забули пароль?
        </Link>
        <BaseButtonStart label="Увійти" />
        {wrongPassword && (
          <ErrorMes
            message={status}
            onClose={() => setWrongPassword(false)}
          />
        )}
      </Form>
    </Formik>
  );
};

export default SigninForm;

//{"username": "Fine",
//     "email": "missFine@gmail.com",
//     "password": "missFine@gmail.com"
// }

// {
//     "message": "Registration successful",
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE3NTAyMjc3NDYsImV4cCI6MTc1MDIyODY0Nn0.SmKvlxlAhey1E6WnnRt_2-p5__i2p7SSN_HQDWrLfqI"
// }

// <label htmlFor="password">Пароль</label>
//         <div className={css.inputwrap}>
//         <Field type={visible ? "text" : "password"} name="password" className={css.input} autoComplete="off"/>
//         <span className={css.password}>
//           <svg className={css.icon}>
//                       <use href="./icons.svg#icon-password"></use>
//                     </svg>
//                     <svg className={css.icon}>
//                       <use href="./icons.svg#icon-password-star"></use>
//                     </svg>
//           </span>

//         {/* <label htmlFor="password" className={css.label}>Password</label> */}
//         <span className={css.eye} onClick={() => setVisible(!visible)} >
//           <svg className={css.icon}>
//                       <use href={`./icons.svg#${visible ? "icon-password-see" : "icon-password-see"}`}></use>
//                     </svg>
//           </span>
//         </div>
