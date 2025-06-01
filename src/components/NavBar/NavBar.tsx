import { useState } from "react";
import "./NavBar.css"
import { NavLink } from "react-router-dom";
import { ReactComponent as CupIcon } from '../../assets/cup.svg';
import { ReactComponent as GameIcon } from '../../assets/game.svg';
import { ReactComponent as VocIcon } from '../../assets/voc.svg';
import { ReactComponent as SetIcon } from '../../assets/set.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';




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
            <GameIcon className="icon"/>
            </NavLink>
        </li>
        <li className={1 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(1)}>
            <NavLink to="/cup">
            <CupIcon className="icon"/>
            </NavLink>
        </li>
        <li className={2 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(2)}>
            <NavLink to="/voc">
            <VocIcon className="icon"/>
            </NavLink>
        </li>
        <li className={3 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(3)}>
            <NavLink to="/set">
            <SetIcon className="icon"/>
            </NavLink>
        </li>
        <li className={4 === activeIndex ? "active" : ""}
          onClick={() => setActiveIndex(4)}>
            <NavLink to="/share">
            <ShareIcon className="icon"/>
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