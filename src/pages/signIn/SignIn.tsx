import ExtraSignup from "../../components/extraSignup/ExtraSignup";
import SigninForm from "../../components/signinFrom/SigninForm";

import css from "./SignIn.module.css";



const SignIn = () => {
  
  return <div className={css.wrap}>
    <h2>Вхід</h2>
    <SigninForm/>

<ExtraSignup/>
  </div>;
};

export default SignIn;
