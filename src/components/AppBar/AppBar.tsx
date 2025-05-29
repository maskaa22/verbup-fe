import { NavLink } from "react-router-dom";
// import css from "./AppBar.module.css"
// import { useEffect, useRef, useState } from "react";
import "./AppBar.css"
import Settings from "../../assets/lets-icons_setting-line-light_min.svg";
import Vocabulary from "../../assets/material-symbol-light_book-3_min.svg";
import Trophy from "../../assets/material-symbols-light_trophy_min.svg";
import Share from "../../assets/mynaui_share_min.svg";
import Gamepad from "../../assets/solar_gamepad_linear_min.svg";

const AppBar: React.FC = () => {
//     const [delta, setDelta] = useState(33)
//     const prevLeftRef = useRef(0)
//     const location = useLocation()


//     useEffect(() => {
//         const active = document.querySelector(".active") as HTMLElement;      
//         const targetPoint = active.offsetLeft;
//         if(targetPoint && prevLeftRef) {
//         const prevPoint = prevLeftRef.current;
//         const move = targetPoint - prevPoint;  
        
//         console.log("targetPoint", targetPoint)
//         console.log("prevPoint", prevPoint)
//         console.log("move", move)
//         setDelta(move);

//         prevLeftRef.current = targetPoint;
        
//         }

//     }, [location.pathname])

// const styleobj = {
//     // transform: `translateX(${delta}px)`,
//     left: `${delta}px`

// }
    return <div className="wrap">
        
    <ul className="list">
            <NavLink className="link" to="/game">
        <Gamepad/>
        </NavLink>
            <NavLink className="link" to="/cup">
        <Trophy/>
        </NavLink>
        <NavLink className="link" to="/voc">
        <Vocabulary/>
        </NavLink>
        <NavLink className="link" to="/set">
        <Settings/>
        </NavLink>
        <NavLink className="link" to="/share">
        <Share/>
        </NavLink>
        <div className="indi"></div>
    </ul>
    </div>
}
export default AppBar;