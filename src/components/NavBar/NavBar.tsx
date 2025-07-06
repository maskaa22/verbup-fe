import { useEffect, useState } from "react";
import css from "./NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";



const NavBar = () => {  
  const [activeIndex, setActiveIndex] = useState(0);
  const [noActive, setNoActive] = useState(true);
  const location = useLocation().pathname;

//   if(isActive){setNoActive(false)}   this line is not allowed during render unless it's in useEffect() !!!

  useEffect(() => {
    switch (true) {
      case location.startsWith("/game"):
        setActiveIndex(0);
        setNoActive(false)
        break;
      case location === "/cup":
        setActiveIndex(1);
        setNoActive(false)
        break;
      case location === "/voc":
        setActiveIndex(2);
        setNoActive(false)
        break;
      case location.startsWith("/setting"):
        setActiveIndex(3);
        setNoActive(false)
        break;
        case location.startsWith("/change"):
        setActiveIndex(3);
        setNoActive(false)
        break;
      case location === "/home":
        setActiveIndex(4);
        setNoActive(false)
        break;
        default:
      setNoActive(true);
    }
  }, [location]);
  const navWidth = 72;



  return (
    <div className={css.navBar}>
      <div className={css.navigation}>
        <div>
        <ul>
          <li>
            <NavLink className={({ isActive }) => clsx(isActive && css.active)} to="/game">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-game"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => clsx(isActive && css.active)} to="/cup">
              <svg className={clsx(css.icon, css.iconone)}>
                <use href="./icons.svg#icon-achievements"></use>
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => clsx(isActive && css.active)} to="/voc">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-vocabulary"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) =>
    clsx(
      isActive && css.active,
      location.startsWith("/change") && css.active
    )
  } to="/setting">
              <svg className={clsx(css.icon)}>
                <use href="./icons.svg#icon-setting"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => clsx(isActive && css.active)} to="/home">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-home"></use>
              </svg>{" "}
            </NavLink>
          </li>
          
        </ul>
        <span className={clsx(css.indicator, noActive && css.noActive)}
            style={{transform: `translateX(${navWidth * activeIndex}px)`,}}></span>
            </div>
      </div>
    </div>
  );
};
export default NavBar;
