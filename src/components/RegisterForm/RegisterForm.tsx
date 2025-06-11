import { Field, Form, Formik, type FormikHelpers } from "formik";
import s from "./RegistraterForm.module.css";

export interface RegFormValues {
  email: string;
  name: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (
    values: RegFormValues,
    actions: FormikHelpers<RegFormValues>
  ): void => {
    console.log(values);
    // dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label htmlFor="name">Ім'я</label>
        <div>
          <Field type="text" name="name" placeholder="Введіть ваше ім'я" />
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
        <button type="submit">Зарееструватися</button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
