import { Field, Form, Formik, type FormikHelpers } from "formik";
import s from "./RegistraterForm.module.css";

export interface RegFormValues {
  email: string,
name: string,
password: string,
}

const RegisterForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: RegFormValues, actions: FormikHelpers<RegFormValues>): void => {
    console.log(values)
    // dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label htmlFor="name">
          Ім'я
        </label> 
        <Field type="text" name="name" placeholder="Введіть ваше ім'я" />
        <label htmlFor="email">
          Email
        </label>
        <Field type="email" name="email" placeholder="your@email.com" />
        <label htmlFor="password">
          Пароль
        </label>
        <Field type="password" name="password" placeholder="Мінімум 8 символів" />
        <button type="submit">Створити акаунт</button>
      </Form>
    </Formik>
  );
}

export default RegisterForm;