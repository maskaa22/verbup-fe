import css from "./ExtraSignup.module.css"
const ExtraSignup = ( ) => {
    return <div className={css.wrap}>
        <div>
        <button >Продовжити з Google</button>
        <svg className={css.icon}>
            <use href="./icons.svg#icon-google"></use>
          </svg>
        </div>
        <div>
        <button >Продовжити з Facebook</button>
        <svg className={css.icon}>
            <use href="./icons.svg#icon-facebook"></use>
          </svg>
        </div>
    </div>
}
export default ExtraSignup;