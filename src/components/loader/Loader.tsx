import css from "./Loader.module.css"

const Loader = () => {
return <div className={css.wrap}>
    <img className={css.pulseImage} src="/image/Venus-min.png" alt="Planet Venus loading..." />
</div>
}

export default Loader;