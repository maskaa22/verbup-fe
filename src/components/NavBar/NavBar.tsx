import { useState } from "react";
import "./NavBar.css"
import { NavLink } from "react-router-dom";




const NavBar = () => {
const navWidth = 70;

const [activeIndex, setActiveIndex] = useState(0);

return (
    <div className="navBar">
  <div className="navigation">
    <ul>
      <li className={0 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(0)}>
            <NavLink to="/game">
<svg className="icon">
        <use href="./icons.svg#icon-game"></use>
      </svg>            </NavLink>
        </li>
        <li className={1 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(1)}>
            <NavLink to="/cup">
      <svg className="icon">
        <use href="./icons.svg#icon-cup"></use>
      </svg>
            </NavLink>
        </li>
        <li className={2 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(2)}>
            <NavLink to="/voc">
<svg className="icon">
        <use href="./icons.svg#icon-voc"></use>
      </svg>            </NavLink>
        </li>
        <li className={3 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(3)}>
            <NavLink to="/set">
<svg className="icon">
        <use href="./icons.svg#icon-set"></use>
      </svg>            </NavLink>
        </li>
        <li className={4 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(4)}>
            <NavLink to="/share">
<svg className="icon">
        <use href="./icons.svg#icon-share"></use>
      </svg>            </NavLink>
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
        className="indicator"
        style={{
          transform: `translateX(${navWidth * activeIndex}px)`,
        }}
      />
    </ul>
  </div>
  </div>
);
}
export default NavBar