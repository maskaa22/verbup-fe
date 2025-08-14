import { NavLink, useLocation } from "react-router-dom"
import css from "./StartLink.module.css"
const StartLink = () => {
  const location = useLocation().pathname;
    return <>
    {location === "/home" && <img src="/image/game-controller-min.png" alt="cute astronaut is reading his journal" /> }
     <NavLink className={css.link} to="/setting/game">
          Почати
        </NavLink>
        </>
}

export default StartLink;