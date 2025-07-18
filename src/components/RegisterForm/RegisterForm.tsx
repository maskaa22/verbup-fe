import { type FormikHelpers } from "formik";
// import s from "./RegistraterForm.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { register } from "../../redux/auth/operations";
import FormTemplate from "../formForm/FormTemplate";
import { arrOfNamesSignup } from "../../constants";
import type { RegFormValues } from "../../utils/formTypes";

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (
    values: RegFormValues,
    actions: FormikHelpers<RegFormValues>
  ): void => {
    dispatch(register(values));
    actions.resetForm();
  };

  const props = {
    arrOfNames: arrOfNamesSignup,
    onSubmit: handleSubmit,
  };
  return <FormTemplate {...props} />;
};

export default RegisterForm;

{
  /* <Formik
      initialValues={{ username: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label htmlFor="name">Ім'я</label>
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
        </div>
        <label htmlFor="password">Пароль</label>
        <div>
          <Field
            type="password"
            name="password"
            placeholder="Мінімум 8 символів"
          />
          <svg className={s.icon}>
            <use href="./icons.svg#icon-password"></use>
          </svg>
        </div>
        <BaseButtonStart label="Зарееструватися"/>
      </Form>
    </Formik> */
}
