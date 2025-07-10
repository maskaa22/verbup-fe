import React from "react";
import { Link, Outlet } from "react-router-dom";
import css from "./Setting.module.css";

const Setting = () => {
  return (
    <div className={css.wrap}>
      <h2>Налаштування</h2>

      <h3>Профіль</h3>
      <ul className={css.list}>
        <li>
          <Link to={"change-username"}>Змінити Імя</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
        <li>
          <Link to={"change-password"}>Змінити пароль</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
      </ul>

      <h3>Інше</h3>
      <ul className={css.list}>
        <li>
          <Link to={"notification-params"}>Параметри сповіщень</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
        <li>
          <Link to={"/"}>Контакти</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
        <li>
          <Link to={"/"}>Поділитись з друзями</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
        <li>
          <Link to={"theme-switcher"}>Тема</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
        <li>
          <Link to={"/setting/game"}>Обрати інший рівень</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
        <li>
          <button className={css.button}>Вийти з акаунту</button>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default Setting;
