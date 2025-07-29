import { NavLink } from "react-router-dom";
import css from "./Intro.module.css";
import cuteAstro from "../../assets/cute astronaut sitting with flag.png";
import LogoIntroNew from "../../components/logoIntroNew/LogoIntroNew";

const Intro = () => {
  return (
    <div>
      <LogoIntroNew />
      <div className={`${css.intro} container`}>
        {/* <div className={css.headlineWrap}>
      <h1 className={css.headline}>let's <span>verb</span> <span>up</span> <span className={css.droopyHL}>up</span> </h1>
    </div> */}
        <p>
          Щоденна практика — твій ключ до <span> справжнього прогресу.</span>
        </p>
        <img className={css.image} src={cuteAstro} alt="" />
        <p>
          Що спільного в go, went і gone?{" "}
          <span> VerbUp знає відповідь — і ти скоро теж. </span>
        </p>
        <NavLink className={css.link} to="/setting/game">
          Почати
        </NavLink>
        {/* <div className={css.signWrap}>
      <div>
        <span>Вже є акаунт?</span>
        <NavLink to="/signin"> Увійти</NavLink>
      </div>
      <span>або</span>
      <NavLink to="/signup">Зареєструватись</NavLink>
    </div> */}
      </div>
    </div>
  );
};

export default Intro;
