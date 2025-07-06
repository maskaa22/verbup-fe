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
    switch (true) {
      case location === "/setting/game":
         console.log(location)
        setGlass(true);
        setPlantes(true);
        setNavigation(true);
        break;
      case location.includes("/home"):
        console.log(location)
        setGlass(true);
        setPlantes(false);
        setNavigation(true);
        break;
      case location.includes("/signup"):
        setGlass(true);
        setPlantes(true);
        setNavigation(false);
        break;
      case location.includes("/game"):
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        break;
        // case location.includes("/game/check-word"):
        //   setGlass(false);
        // setPlantes(false);
        // setNavigation(true);
        //   break; 
      case location.includes("/cup"):
        break;
      case location.includes("/voc"):
                console.log(location)
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        break;
      case location.startsWith("/setting"):
        console.log(location)
        setGlass(true);
        setPlantes(true);
        setNavigation(true);
        break;
        case location.startsWith("/change"):
                      
          setGlass(true);
        setPlantes(true);
        setNavigation(true);
          break;
          case location === "/notification-params":
            setGlass(true);
        setPlantes(true);
        setNavigation(true);
            break;
            case location === "/theme-switcher":
            setGlass(true);
        setPlantes(true);
        setNavigation(true);
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
