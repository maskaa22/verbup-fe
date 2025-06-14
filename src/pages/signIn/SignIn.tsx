import ExtraSignup from "../../components/extraSignup/ExtraSignup";
import SigninForm from "../../components/signinFrom/SigninForm";
import { Link } from "react-router-dom";
import css from "./SignIn.module.css";



const SignIn = () => {
  
  return <div className={css.wrap}>
    <SigninForm/>
    <Link to="/">Забули пароль?</Link>
<ExtraSignup/>
  </div>;
};

export default SignIn;
