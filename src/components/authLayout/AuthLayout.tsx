import { Outlet } from "react-router-dom";
import css from "./AuthLayout.module.css";
import Logo from "../logo/Logo";
const AuthLayout = () => {
  return (
    <div className={`${css.wrap} container`}>
      <Logo />
      <div className={css.planets}>
        <div className={css.planet}></div>
        <div className={css.planet}></div>
        <div className={css.planet}></div>
      </div>
      <div className={css.glass}>{<Outlet />}</div>
    </div>
  );
};
export default AuthLayout;
