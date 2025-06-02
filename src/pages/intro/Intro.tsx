import { NavLink } from "react-router-dom";
import css from "./Intro.module.css";
import cuteAstro from "../../assets/cute astronaut sitting with flag.png"

const Intro = () => {
  return <div className={`${css.intro} container`}>
    <div className={css.headlineWrap}>
      <h1 className={css.headline}>let's <span>verb</span> <span>up</span> <span className={css.droopyHL}>up</span> </h1>
    </div>
    <p>Щоденна практика — твій ключ до справжнього прогресу.</p>
    <img className={css.image} src={cuteAstro} alt="" />
    <p>Що спільного в go, went і gone? VerbUp знає відповідь — і ти скоро теж.</p>
    <NavLink className={css.link} to="/signup">Почати</NavLink>
  </div>;
};

export default Intro;
