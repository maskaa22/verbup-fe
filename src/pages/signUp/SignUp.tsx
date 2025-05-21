import RegisterForm from "../../components/RegisterForm/RegisterForm";
import s from "./SignUp.module.css";


const SignUp = () => {
  return <div className={s.wrap}>
 <div className={s.instructions}>
    <p>Реєстрація</p>
    <p>Створи обліковий запис для вивчення неправильнич дієслів</p>
  </div>
  <RegisterForm/>

  </div>;
};

export default SignUp;
