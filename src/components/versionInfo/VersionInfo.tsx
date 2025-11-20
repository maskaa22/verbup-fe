import css from "./VersionInfo.module.css"

const VersionInfo = () => {
    return <div className={`${css.marquee} container`}>
        <div className={css.track}>
       <span>Alfa version  Alfa version Alfa version Alfa version Alfa version </span>
    <span>Alfa version   Alfa version   Alfa version   Alfa version   Alfa version </span>
    </div>
    </div>
};

export default VersionInfo;