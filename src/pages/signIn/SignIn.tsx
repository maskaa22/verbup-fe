// import ExtraSignup from "../../components/extraSignup/ExtraSignup";
import css from "./SignIn.module.css";
import SigninForm from "../../components/signinFrom/SigninForm";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className={css.wrap}>
      <Link to="/">
        <svg className={css.iconArrowBack}>
          <use href="./icons.svg#icon-arrow-back"></use>
        </svg>
      </Link>
      <h2>Вхід</h2>
      <SigninForm />
      <div className={css.orWrap}>
        <span>Немає кабінету?</span>
        <Link to="/signup">Зареєструватися</Link>
      </div>
      {/* <ExtraSignup /> */}
      
    </div>
  );
};

export default SignIn;
