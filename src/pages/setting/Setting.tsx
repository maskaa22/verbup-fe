import React from "react";
import { Link, Outlet } from "react-router-dom";
import css from "./Setting.module.css";

const Setting = () => {
  return (
    <div>
      <h2>Налаштування</h2>

      <h3>Профіль</h3>
      <ul>
        <li>
          <Link to={"/"}>Змінити Імя</Link>
        </li>
        <li>
          <Link to={"/change-password"}>Змінити пароль</Link>
        </li>
      </ul>

      <h3>Інше</h3>
      <ul>
        <li>
          <Link to={"/"}>Параметри сповіщень</Link>
        </li>
        <li>
          <Link to={"/"}>Контакти</Link>
        </li>
        <li>
          <Link to={"/"}>Поділитись з друзями</Link>
        </li>
        <li>
          <Link to={"/"}>Тема</Link>
        </li>
        <li>
          <Link to={"/setting/game"}>Обрати інший рівень</Link>
        </li>
        <li>
          <button className={css.button}>Вийти з акаунту</button>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default Setting;
