import { useLocation } from "react-router-dom";
import VersionInfo from "../versionInfo/VersionInfo";
import css from "./LogoIntroNew.module.css";

const LogoIntroNew = () => {
  const location = useLocation().pathname;
  return (
    <>
      <div className={css.headlineWrap}>
        <h1 className={css.headline}>
          let's verb <span className={css.secretUp}>upp</span>{" "}
          <span className={css.realUp}>up</span>{" "}
          <span className={css.droopyHL}>Up</span>{" "}
        </h1>
      </div>
      {location !== "/home" && <VersionInfo />}
    </>
  );
};

export default LogoIntroNew;
