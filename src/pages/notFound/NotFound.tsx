import { useNavigate } from "react-router-dom";
import BaseButtonStart from "../../components/baseButtonStart/BaseButtonStart";
import Logo from "../../components/logo/Logo";
import StarBackground from "../../components/starBackground/StarBackground";
import css from "./NotFound.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const NotFound = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLoggedIn);

  return (
    <div className={`${css.outerWrap} container`}>
      <Logo />
      <div className={css.wrapper}>
        <div className={css.intro}>
          <StarBackground />
          <div className={css.content}>
            <p>4</p>
            <img src="/planet.png" alt="Not found" />
            <p className={css.lastP}>4</p>
          </div>
        </div>
        <div className={css.introText}>
          <div className={css.textWrapper}>
            <p>Навіть у космосі бувають помилки</p>
            <p>Поверніться на головну сторінку</p>
          </div>
          <BaseButtonStart
            label="На головну"
            onClick={() => navigate(isLogin ? "/home" : "/")}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
