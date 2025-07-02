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
      case "/home":
        setGlass(true);
        setPlantes(false);
        setNavigation(true);
        break;
      case "/signup":
        setGlass(true);
        setPlantes(false);
        setNavigation(false);
        break;
      case "/game":
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        break;
        // case location.includes("/game/check-word"):
        //   setGlass(false);
        // setPlantes(false);
        // setNavigation(true);
        //   break; 
      case "/cup":
        break;
      case "/voc":
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        break;
      case "/setting":
        setGlass(true);
        setPlantes(true);
        setNavigation(true);
        break;
      case "/share":
        break;
        default: 
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
    }
  }, [location]);
  // const showNavBar = pathname !== "/signin" && pathname !== "/signup";
  return (
    <div className={clsx(css.outerWrap, planets ? css.planets : css.noPlanets) }>
      <div className={`${css.wrap} container`}>
        <div >
          <Logo />
          {<div className={clsx(glass && css.glass)}>{<Outlet />}</div>}
        </div>
      </div>
      {navigation && <NavBar />}
    </div>
  );
};
export default AuthLayout;
