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
      {["game", "cup", "voc", "set", "share"].map((label, index) => (
        <li
          key={label}
          className={index === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(index)}
        >
            <NavLink to={`/${label}`}>
                <span className="icon">🔍</span>
            <span className="text">{label}</span>
            </NavLink>
          {/* <a>
            <span className="icon">🔍</span>
            <span className="text">{label}</span>
          </a> */}
        </li>
      ))}
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