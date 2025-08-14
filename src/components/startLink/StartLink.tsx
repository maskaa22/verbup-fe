import { NavLink, useLocation } from "react-router-dom"
import css from "./StartLink.module.css"
const StartLink = () => {
  const location = useLocation().pathname;
    return <div className={css.wrap}>
    {location === "/home" && <img className={css.gameConsole} src="/image/game-controller-min.png" alt="cute astronaut is reading his journal" /> }
     <NavLink className={css.link} to="/setting/game">
          Почати
        </NavLink>
        </div>
}

export default StartLink;