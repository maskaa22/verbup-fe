import css from "./Background.module.css"
const Background = () => {
    return <div>
        <div className={css.planets}>
        <div className={css.planet}></div>
        <div className={css.planet}></div>
        <div className={css.planet}></div>
      </div>
      <div className={css.glass}></div>
    </div>
}
export default Background;