import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <NavLink to="/home" className={css.wrap}>
      <img src="/image/Logo-full-min.png" alt="planet above words verb up!" />
      <p className={css.mvp}>Alfa version</p>
    </NavLink>
  );
};
export default Logo;
