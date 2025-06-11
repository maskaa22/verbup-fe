import { NavLink } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./SignUp.module.css";
import ExtraSignup from "../../components/extraSignup/ExtraSignup";


const SignUp = () => {
  return (
    <div className={css.wrap}>
        <div className={css.instructions}>
          <p>Реєстрація</p>
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
