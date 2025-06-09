import { NavLink } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./SignUp.module.css";


const SignUp = () => {
  return <div className={`${css.wrap} container`}>
    <Logo/>
    <div className={css.planets}>
    <div className={css.planet}></div>
    <div className={css.planet}></div>
    <div className={css.planet}></div>
    </div>
    <div className={css.glass}>
 <div className={css.instructions}>
    <p>Реєстрація</p>
    <p>Створи обліковий запис для вивчення неправильнич дієслів</p>
  </div>
  <RegisterForm/>
  
  <div className={css.bottomlink}>
<p>Вже є кабінет?</p>
<NavLink to="/signin">Увійти</NavLink>
</div>
</div>
  </div>;
};

export default SignUp;
