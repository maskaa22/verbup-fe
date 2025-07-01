import { Outlet, useLocation } from "react-router-dom";
import css from "./AuthLayout.module.css";
import Logo from "../logo/Logo";
import NavBar from "../navBar/NavBar";
import { useEffect, useState } from "react";
import clsx from "clsx";
const AuthLayout = () => {
  const [glass, setGlass] = useState(false);
  const [planets, setPlantes] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const location = useLocation().pathname;
  useEffect(() => {
    switch (location) {
      case "/signup":
        setGlass(true);
        setPlantes(false);
        setNavigation(false);
        break;
      case "/game":
        break;
      case "/cup":
        break;
      case "/voc":
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        break;
      case "/set":
        break;
      case "/share":
        break;
    }
  }, [location]);
  return (
    <div className={`${css.wrap} container`}>
      <Logo />
      {planets && (
        <div className={css.planets}>
          {/* <div className={css.planet}></div>
        <div className={css.planet}></div>
        <div className={css.planet}></div> */}
        </div>
      )}
      {<div className={clsx(glass && css.glass)}>{<Outlet />}</div>}
      {navigation && <NavBar />};
    </div>
  );
};
export default AuthLayout;
