import { Outlet } from "react-router-dom";
import css from "./AuthLayout.module.css";
import Logo from "../logo/Logo";
import NavBar from "../navBar/NavBar";
const AuthLayout = () => {
  return (
    <div>
    <div className={`${css.wrap} container`}>
      <Logo />
      <div className={css.planets}>
        {/* <div className={css.planet}></div>
        <div className={css.planet}></div>
        <div className={css.planet}></div> */}
     
      <div className={css.glass}>{<Outlet />}</div> 
      </div>
    </div>
    <NavBar/>
    </div>
  );
};
export default AuthLayout;
