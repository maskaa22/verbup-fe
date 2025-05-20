import s from "./SignUp.module.css";
import { Field, Form, Formik, type FormikHelpers } from "formik";

interface values {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const handleSubmit = (values: values, actions: FormikHelpers<values>) => {
    console.log(actions);
    // dispatch(register(values));
    actions.resetForm();
  };
  return <div className={s.wrap}>
 <div className={s.instructions}>
            <p>Реєстрація</p>
            <p>Створи обліковий запис для вивчення неправильнич дієслів</p>
    </div>
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

  </div>;
};

export default SignUp;
