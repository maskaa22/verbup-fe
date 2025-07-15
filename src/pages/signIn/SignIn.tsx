import { useDispatch } from "react-redux";
import ExtraSignup from "../../components/extraSignup/ExtraSignup";
import FormTemplate from "../../components/formForm/FormTemplate";
import { arrOfNamesSignin } from "../../constants";
// import SigninForm from "../../components/signinFrom/SigninForm";

import css from "./SignIn.module.css";
import { login } from "../../redux/auth/operations";
import type { LogFormValues } from "../../utils/formTypes";
import type { FormikHelpers } from "formik";
import type { AppDispatch } from "../../redux/store";

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleSubmit = (
      values: LogFormValues,
      actions: FormikHelpers<LogFormValues>
    ): void => {
      dispatch(login(values));
      actions.resetForm();
    };
   const props = {
      arrOfNames: arrOfNamesSignin,
      onSubmit: handleSubmit,
    };
  return (
    <div className={css.wrap}>
      <h2>Вхід</h2>
      {/* <SigninForm /> */}
      <FormTemplate {...props}/>
      <ExtraSignup />
    </div>
  );
};

export default SignIn;
