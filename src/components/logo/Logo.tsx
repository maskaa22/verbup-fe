import css from "./Logo.module.css"

const Logo = () => {
return <div className={css.wrap}>
    <img src="/image/Logo-full-min.png" alt="planet above words verb up!" />
    <p className={css.mvp}>MVP version</p>
</div>
};
export default Logo;