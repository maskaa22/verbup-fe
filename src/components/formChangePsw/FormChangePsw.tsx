import { Formik, Form, type FormikHelpers } from "formik";
import FormInputPassword from "../formInputPassword/FormInputPassword";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";
import css from "./FormChangePsw.module.css"



interface changePswValues {
  currentPsw: string;
  newPws: string;
  confirmPsw: string;
}
const FromChangePsw = () => {
  const handleSubmit = (
    values: changePswValues,
    actions: FormikHelpers<changePswValues>
  ): void => {
    console.log(values)
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ currentPsw: "", newPws: "", confirmPsw: "" }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <FormInputPassword isFor="signin" label="Поточний пароль" />
        <FormInputPassword isFor="signup" label="Новий пароль" />
        <FormInputPassword isFor="signin" label="Підтвердити новий пароль" />
      <BaseButtonStart label="Далі"/>
      </Form>
    </Formik>
  );
};

export default FromChangePsw;
