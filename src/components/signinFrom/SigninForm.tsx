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
import ErrorMes from "../errorMes/ErrorMes";
import Modal from "../modal/Modal";
import { useSelector } from "react-redux";
import { selectIsError } from "../../redux/auth/selectors";
import { setErrorNull } from "../../redux/auth/slice";
import { SignInSchema } from "../../schemas/schmas";

const SigninForm = () => {
  const error = useSelector(selectIsError);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async (
    values: LogFormValues,
    actions: FormikHelpers<LogFormValues>
  ): Promise<void> => {
    const res = await dispatch(login(values));
    if (login.fulfilled.match(res)) {
      navigate("/home");
    }
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
        {error && (
          <Modal onClose={() => dispatch(setErrorNull())}>{<ErrorMes />}</Modal>
        )}
      </Form>
    </Formik>
  );
};

export default SigninForm;
