import { useState } from "react";
import css from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const activeLink = ({ isActive }: {isActive: boolean}) => {
  return clsx(isActive && css.active);
};

const NavBar = () => {
  const navWidth = 70;

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={css.navBar}>
      <div className={css.navigation}>
        <ul>
          <li
          // className={0 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(0)}
          >
            <NavLink className={activeLink} to="/game">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-game"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li
          // className={1 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(1)}
          >
            <NavLink className={activeLink} to="/cup">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-cup"></use>
              </svg>
            </NavLink>
          </li>
          <li
          // className={2 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(2)}
          >
            <NavLink className={activeLink} to="/voc">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-voc"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li
          // className={3 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(3)}
          >
            <NavLink className={activeLink} to="/set">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-set"></use>
              </svg>{" "}
            </NavLink>
          </li>
          <li
          // className={4 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(4)}
          >
            <NavLink className={activeLink} to="/share">
              <svg className={css.icon}>
                <use href="./icons.svg#icon-share"></use>
              </svg>{" "}
            </NavLink>
          </li>
          {/* {["game", "cup", "voc", "set", "share"].map((label, index) => (
        <li
          key={label}
          className={index === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(index)}
        >
            <NavLink to={`/${label}`}>
                <span className="icon">🔍</span>
            </NavLink>
        </li>
      ))} */}
          <div
            className={css.indicator}
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
