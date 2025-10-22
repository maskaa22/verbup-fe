import { NavLink } from "react-router-dom";
import css from "./Intro.module.css";
import cuteAstro from "../../assets/cute astronaut sitting with flag.png";
import LogoIntroNew from "../../components/logoIntroNew/LogoIntroNew";

const Intro = () => {
  return (
    <>
      <LogoIntroNew />
      <div className={`${css.intro} container`}>
        <p>
          Щоденна практика — твій ключ до <span> справжнього прогресу.</span>
        </p>
        <img className={css.image} src={cuteAstro} alt="" />
        <p>
          Що спільного в go, went і gone?{" "}
          <span> VerbUp знає відповідь — і ти скоро теж. </span>
        </p>
        <NavLink className={css.link} to="/game">
          Почати
        </NavLink>
        <div className={css.signWrap}>
      <div>
        <span>Вже є акаунт?</span>
        <NavLink to="/signin"> Увійти</NavLink>
      </div>
      <span>або</span>
      <NavLink to="/signup">Зареєструватись</NavLink>
    </div>
      </div>
    </>
  );
};

export default Intro;
