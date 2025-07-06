import { NavLink } from "react-router-dom";
import css from "./Intro.module.css";
import cuteAstro from "../../assets/cute astronaut sitting with flag.png"
import LogoIntro from "../../components/logoIntro/LogoIntro";

const Intro = () => {
  return <div className={`${css.intro} container`}>
    <LogoIntro/>
    {/* <div className={css.headlineWrap}>
      <h1 className={css.headline}>let's <span>verb</span> <span>up</span> <span className={css.droopyHL}>up</span> </h1>
    </div> */}
    <p>Щоденна практика — твій ключ до <span> справжнього прогресу.</span></p>
    <img className={css.image} src={cuteAstro} alt="" />
    <p>Що спільного в go, went і gone? <span> VerbUp знає відповідь — і ти скоро теж. </span></p>
    <NavLink className={css.link} to="/home">Почати</NavLink>
    <div className={css.signWrap}>
      <div>
        <span>Вже є акаунт?</span>
        <NavLink to="/signin"> Увійти</NavLink>
      </div>
      <span>або</span>
      <NavLink to="/signup">Зареєструватись</NavLink>
    </div>
  </div>;
};

export default Intro;
