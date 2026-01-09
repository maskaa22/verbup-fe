import clsx from "clsx";
import css from "./ThemeSwitcher.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDarkTheme } from "../../redux/notify/selectors";
import { setTheme } from "../../redux/notify/slice";
import { useEffect } from "react";
const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectDarkTheme);
  useEffect(() => console.log(theme), [theme]);

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Тема</h2>
      <div className={css.theme}>
        <div className={css.option}>
          <p>Світла тема</p>

          <label htmlFor="light" className={css.switch}>
            <input
              id="light"
              className={css.input}
              type="radio"
              name="themeSwitcher"
              value="light"
              checked={theme === "light"}
              onChange={(e) => dispatch(setTheme(e.target.value))}
              //    disabled={disabled}
            />
            <span className={clsx(css.slider, css.round)}></span>
          </label>
        </div>
        <div className={css.option}>
          <p>Темна тема</p>

          <label htmlFor="dark" className={css.switch}>
            <input
              id="dark"
              className={css.input}
              type="radio"
              name="themeSwitcher"
              value="dark"
              checked={theme === "dark"}
              onChange={(e) => dispatch(setTheme(e.target.value))}
              //    disabled={disabled}
            />
            <span className={clsx(css.slider, css.round)}></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
