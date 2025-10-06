import { Outlet, useLocation } from "react-router-dom";
import css from "./AuthLayout.module.css";
import Logo from "../logo/Logo";

import { useEffect, useState } from "react";
import clsx from "clsx";

import LogoIntroNew from "../logoIntroNew/LogoIntroNew";
import Menu from "../menu/Menu";
const AuthLayout = () => {
  const [glass, setGlass] = useState(false);
  const [planets, setPlantes] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [logo, setLogo] = useState(true);
  const [logoIntro, setLogoIntro] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    switch (true) {
      case location === "/setting/game":
        setGlass(true);
        setPlantes(true);
        setNavigation(true);
        setLogo(true);
        setLogoIntro(false);
        break;
      case location.includes("/home"):
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        setLogo(false);
        setLogoIntro(true);
        break;
      case location.includes("/signup"):
        setGlass(true);
        setPlantes(true);
        setNavigation(false);
        setLogo(true);
        setLogoIntro(false);
        setScroll(true);
        break;
      case location.includes("/signin"):
        setGlass(true);
        setPlantes(true);
        setNavigation(false);
        setLogo(true);
        setLogoIntro(false);

        break;
      case location === "/game":
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        setLogo(false);
        setLogoIntro(true);

        break;
      case location.includes("/game/check-word"):
        setGlass(false);
        setPlantes(false);
        setNavigation(false);
        setLogo(false);
        setLogoIntro(false);
        break;
      case location.includes("/game/write-word"):
        setGlass(false);
        setPlantes(false);
        setNavigation(false);
        setLogo(false);
        setLogoIntro(false);
        break;
      case location.includes("/game/result"):
        setGlass(false);
        setPlantes(false);
        setNavigation(false);
        setLogo(false);
        setLogoIntro(false);
        break;
      case location.includes("/cup"):
        break;
      case location.includes("/voc"):
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        setLogo(true);
        setLogoIntro(false);

        break;
      case location.startsWith("/setting"):
        setGlass(true);
        setPlantes(true);
        setNavigation(true);
        setLogo(true);
        setLogoIntro(false);

        break;
      case location.startsWith("/change"):
        setGlass(true);
        setPlantes(true);
        setNavigation(true);
        setLogo(true);
        setLogoIntro(false);

        break;
      case location === "/notification-params":
        setGlass(true);
        setPlantes(true);
        setNavigation(true);
        setLogo(true);
        setLogoIntro(false);

        break;
      case location === "/theme-switcher":
        setGlass(true);
        setPlantes(true);
        setNavigation(true);
        setLogo(true);
        setLogoIntro(false);

        break;
      default:
        setGlass(false);
        setPlantes(false);
        setNavigation(true);
        setLogo(true);
        setLogoIntro(false);
        setScroll(false);
    }
  }, [location]);
  // const showNavBar = pathname !== "/signin" && pathname !== "/signup";
  const bgGame = location.includes("/game/check-word");
  // const game = location.includes("/game");

  return (
    <div
      className={clsx(
        css.outerWrap,
        planets ? css.planets : css.noPlanets,
        bgGame && css.bgGame,
        // game && css.wrapper
      )}
    >
      {logoIntro && <LogoIntroNew />}

      <div className={`${css.wrap} container`}>
        {logo && <Logo />}
        <div className={`${glass ? css.glass : css.noClass} ${scroll && css.scrollBar}`}>{<Outlet />}</div>
      </div>
      {navigation && <Menu />}
    </div>
  );
};
export default AuthLayout;
