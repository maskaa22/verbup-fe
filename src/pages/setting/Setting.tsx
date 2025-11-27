// import React from "react";
import { Link, Outlet } from "react-router-dom";
import css from "./Setting.module.css";
import { sendGtagEvent } from "../../utils/googleAnalize";
import { useState } from "react";
import SignOut from "../../components/SignOut/SignOut";
import Modal from "../../components/modal/Modal";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Setting = () => {
  const [modal, setModal] = useState(false);
  const loggedin = useSelector(selectIsLoggedIn);
  const handleClick = () => {
    sendGtagEvent("click", "send feedback", "continue");
  };
  return (
    <div className={css.wrap}>
      <h2>Налаштування</h2>

      {/* <h3 className={css.disabled}>Профіль</h3>
      <ul className={clsx(css.list, css.disabled)}>
        <li>
          <Link to={"#"}>Змінити Імя</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
        <li>
          <Link to={"#"}>Змінити пароль</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
      </ul> */}

      <h3>Інше</h3>
      <ul className={css.list}>
        {/* <li className={css.disabled}>
          <Link to={"notification-params"}>Параметри сповіщень</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li> */}
        {/* <li className={css.disabled}>
          <Link to={"/"}>Контакти</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li> */}
        {/* <li className={css.disabled}>
          <Link to={"/"}>Поділитись з друзями</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li> */}
        {/* <li className={css.disabled}>
          <Link to={"theme-switcher"}>Тема</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li> */}
        <li>
          <Link to={"/setting/game"}>Обрати інший рівень</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
        <li className={!loggedin ? css.disabled : ""}>
          <button onClick={() => setModal(true)} className={css.button}>
            Вийти з акаунту
          </button>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
      </ul>
      <a
        className={css.reviewLink}
        href="https://docs.google.com/forms/d/e/1FAIpQLScwMMvRlebP7YPz7VndPOlzF8iM5rofE2yxS7eisDtgCJJjtA/viewform?usp=sharing&ouid=106998076813103564666"
        target="_blank"
        onClick={handleClick}
      >
        Надіслати відгук
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/search/results/all/?heroEntityKey=urn%3Ali%3Aorganization%3A107940810&keywords=VerbUp&origin=ENTITY_SEARCH_HOME_HISTORY&sid=9!e"
        className={css.linkedInWrap}
      >
        <span>Ми у Linked</span>
        <svg className={css.linkedInIcon}>
          <use href="./icons.svg#icon-linked-in"></use>
        </svg>
      </a>
      {modal && (
        <Modal onClose={() => setModal(false)}>
          {<SignOut onClose={() => setModal(false)} />}
        </Modal>
      )}
      <Outlet />
    </div>
  );
};

export default Setting;
