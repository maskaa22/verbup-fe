import { Link, NavLink } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./SignUp.module.css";
import ExtraSignup from "../../components/extraSignup/ExtraSignup";


const SignUp = () => {
  return (
    <div className={css.wrap}>
        <div className={css.instructions}>
          <Link to="/">
          <svg className={css.iconArrowBack}>
                  <use href="./icons.svg#icon-arrow-back"></use>
                </svg>
          </Link>
          <h2 className={css.title}>Реєстрація</h2>
          <p>Створи обліковий запис для вивчення неправильнич дієслів</p>
        </div>
        <RegisterForm />
        <ExtraSignup />
        <div className={css.bottomlink}>
          <p>Вже є кабінет?</p>
          <NavLink to="/signin"> Увійти</NavLink>
        </div>
    </div>
  );
};

export default SignUp;
