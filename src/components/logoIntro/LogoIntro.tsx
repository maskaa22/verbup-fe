import css from "./LogoIntro.module.css"

const LogoIntro = () => {
    return <div className={css.headlineWrap}>
          <h1 className={css.headline}>let's <span>verb</span> <span>up</span> <span className={css.droopyHL}>up</span> </h1>
        </div>
}

export default LogoIntro;