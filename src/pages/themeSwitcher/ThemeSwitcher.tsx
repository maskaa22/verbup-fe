import css from "./ThemeSwitcher.module.css"
const ThemeSwitcher = () => {
    return <div className={css.wrap}>
<h2 className={css.title}>Тема</h2>
<div className={css.theme}>
    <p>Світла тема</p>
</div>
<div className={css.theme}>
    <p>Темна тема</p>
</div>
    </div>
}

export default ThemeSwitcher;