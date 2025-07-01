import { Outlet, useLocation } from "react-router-dom";
import css from "./AuthLayout.module.css";
import Logo from "../logo/Logo";
import NavBar from "../navBar/NavBar";
import { useEffect, useState } from "react";
import clsx from "clsx";
const AuthLayout = () => {
  const { pathname } = useLocation();

  const showNavBar = pathname !== "/signin" && pathname !== "/signup";
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
      {showNavBar && <NavBar />}
    </div>
  );
};
export default AuthLayout;
