import ExtraSignup from "../../components/extraSignup/ExtraSignup";
import css from "./SignIn.module.css";
import SigninForm from "../../components/signinFrom/SigninForm";

const SignIn = () => {
  return (
    <div className={css.wrap}>
      <h2>Вхід</h2>
      <SigninForm />
      <ExtraSignup />
    </div>
  );
};

export default SignIn;
