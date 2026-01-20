import { NavLink } from "react-router-dom";
import css from "./Intro.module.css";
import LogoIntroNew from "../../components/logoIntroNew/LogoIntroNew";
import { sendGtagEvent } from "../../utils/googleAnalize";


const Intro = () => {
  const handleClick = () => {
    sendGtagEvent('click', 'navigation', 'continue')
  }

  return (
    <>
      <LogoIntroNew />
      <div className={`${css.intro} container`}>
        <p>
          Щоденна практика — твій ключ до <span> справжнього прогресу.</span>
        </p>
        <img className={css.image} src="/cute-astro-christmas-min.png" alt="cute astro in Christmas hat" />
        <p>
          Що спільного в go, went і gone?{" "}
          <span> VerbUp знає відповідь — і ти скоро теж. </span>
        </p>
        <NavLink className={css.link} onClick={handleClick} to="/game">
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
