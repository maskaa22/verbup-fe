import { useEffect, useState } from "react";
import css from "./NavBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";



const NavBar = () => {  
  const [activeIndex, setActiveIndex] = useState(0);
  const [noActive, setNoActive] = useState(true);
  const location = useLocation().pathname;
const activeLink = ({ isActive }: { isActive: boolean }) => {
  if(isActive){setNoActive(false)}
  console.log(isActive);
  console.log(noActive)
  return clsx(isActive && css.active);
};

  useEffect(() => {
    console.log(location);
    switch (location) {
      case "/cup":
        setActiveIndex(1);
        break;
      case "/voc":
        setActiveIndex(2);
        break;
      case "/set":
        setActiveIndex(3);
        break;
      case "/share":
        setActiveIndex(4);
        break;
    }
  }, [location]);
  const navWidth = 70;



  return (
    <div className={css.navBar}>
      <div className={css.navigation}>
        <ul>
          <li>
            <NavLink className={activeLink} to="/game">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-game"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to="/cup">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-cup"></use>
              </svg>
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to="/voc">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-voc"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to="/set">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-set"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLink} to="/share">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-share"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <div
            className={clsx(css.indicator, noActive && css.noActive)}
            style={{
              transform: `translateX(${navWidth * activeIndex}px)`,
            }}
          />
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
