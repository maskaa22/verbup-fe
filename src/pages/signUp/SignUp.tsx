import RegisterForm from "../../components/RegisterForm/RegisterForm";
import css from "./SignUp.module.css";


const SignUp = () => {
  return <div className={`${css.wrap} container`}>
 <div className={css.instructions}>
    <p>Реєстрація</p>
    <p>Створи обліковий запис для вивчення неправильнич дієслів</p>
  </div>
  <RegisterForm/>

  </div>;
};

export default SignUp;
