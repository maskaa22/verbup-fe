import { useLocation } from "react-router-dom";
import VersionInfo from "../versionInfo/VersionInfo";
import css from "./LogoIntroNew.module.css"

const LogoIntroNew = () => {
  const location = useLocation().pathname
    return <div>
    <div className={css.headlineWrap}>
          <h1 className={css.headline}>let's verb <span className={css.secretUp}>upp</span> <span className={css.realUp}>up</span> <span className={css.droopyHL}>up</span> </h1>
        </div>
        {location !== "/home" && <VersionInfo/>}
        </div>
}

export default LogoIntroNew;