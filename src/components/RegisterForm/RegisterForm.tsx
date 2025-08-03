import { Formik, Form, type FormikHelpers } from "formik";
import css from "./RegistraterForm.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { register } from "../../redux/auth/operations";
import type { RegFormValues } from "../../utils/formTypes";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";
import FormInput from "../formInput/FormInput";
import FormInputPassword from "../formInputPassword/FormInputPassword";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (
    values: RegFormValues,
    actions: FormikHelpers<RegFormValues>
  ): void => {
    dispatch(register(values));
    actions.resetForm();
  };
  return  <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <FormInput label="Ім'я" name="username" type="text" placeholder="Введіть ваше ім'я" icon="icon-user"/>
        <FormInput label="E - mail" name="email" type="email" placeholder="your@email.com" icon="icon-email"/>
        <FormInputPassword isFor="reg"/>
        <BaseButtonStart label="Зарееструватися"/>
      </Form>
    </Formik> ;
};

export default RegisterForm;




{/* <label htmlFor="name">Ім'я</label>
        <div>
          <Field type="text" name="username" placeholder="Введіть ваше ім'я" />
          <svg className={s.icon}>
            <use href="./icons.svg#icon-user"></use>
          </svg>
        </div>
        <label htmlFor="email">Email</label>
        <div>
          <Field type="email" name="email" placeholder="your@email.com" />
          <svg className={s.icon}>
            <use href="./icons.svg#icon-email"></use>
          </svg>
        </div> */}


  // const props = {
  //   arrOfNames: arrOfNamesSignup,
  //   onSubmit: handleSubmit,
  // };


  // <label htmlFor="password">Пароль</label>
  //       <div>
  //         <Field className={css.input}
  //           type="password"
  //           name="password"
  //           placeholder="Мінімум 8 символів"
  //         />
  //         <svg className={css.icon}>
  //           <use href="./icons.svg#icon-password"></use>
  //         </svg>
  //       </div>