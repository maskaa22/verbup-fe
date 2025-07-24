import css from "./VersionInfo.module.css"

const VersionInfo = () => {
    return <div className={`${css.marquee} container`}>
        <div className={css.track}>
       <span>MVP version   MVP version   MVP version   MVP version   MVP version </span>
    <span>MVP version   MVP version   MVP version   MVP version   MVP version </span>
    </div>
    </div>
};

export default VersionInfo;