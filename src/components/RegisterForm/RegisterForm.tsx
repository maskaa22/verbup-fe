import { Field, Form, Formik, type FormikHelpers } from "formik";

export interface RegFormValues {
  email: string,
name: string,
password: string,
}

export default function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (values: RegFormValues, actions: FormikHelpers<RegFormValues>): void => {
    dispatch(register(values));
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      <Form>
        <label>
          Usarname
          <Field type="text" name="name" />
        </label>
        <label>
          Email
          <Field type="email" name="email" />
        </label>
        <label>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
