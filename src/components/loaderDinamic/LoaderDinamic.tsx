import css from "./LoaderDinamic.module.css"

const LoaderDinamic = () => {
return <div className={css.logoWrap}>
 <img className={css.floating} src="/image/Venus-min.png" alt="Planet Venus loading..." />
</div>
}
export default LoaderDinamic;