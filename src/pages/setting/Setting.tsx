// import React from "react";
import { Link, Outlet } from "react-router-dom";
import css from "./Setting.module.css";
import { sendGtagEvent } from "../../utils/googleAnalize";
import { useState } from "react";
import SignOut from "../../components/SignOut/SignOut";
import Modal from "../../components/modal/Modal";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { shareApp } from "../../utils/shareApp";

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
        <li>
          <Link to={"notification-params"}>Параметри сповіщень</Link>
          <svg>
            <use href="./icons.svg#icon-accordion-arrow"></use>
          </svg>
        </li>
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
        {loggedin && (
          <li className={!loggedin ? css.disabled : ""}>
            <button onClick={() => setModal(true)} className={css.button}>
              Вийти з акаунту
            </button>
            <svg>
              <use href="./icons.svg#icon-accordion-arrow"></use>
            </svg>
          </li>
        )}
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
        <svg className={css.linkedInIcon}>
          <use href="./icons.svg#icon-linked-in"></use>
        </svg>
      </a>
      <a onClick={shareApp} className={css.shapeInWrap}>
        <svg viewBox="0 0 36 36" fill="none" className={css.shapeInIcon}>
          <path
            d="M25.5 33C24.25 33 23.1875 32.5625 22.3125 31.6875C21.4375 30.8125 21 29.75 21 28.5C21 28.35 21.0375 28 21.1125 27.45L10.575 21.3C10.175 21.675 9.7125 21.969 9.1875 22.182C8.6625 22.395 8.1 22.501 7.5 22.5C6.25 22.5 5.1875 22.0625 4.3125 21.1875C3.4375 20.3125 3 19.25 3 18C3 16.75 3.4375 15.6875 4.3125 14.8125C5.1875 13.9375 6.25 13.5 7.5 13.5C8.1 13.5 8.6625 13.6065 9.1875 13.8195C9.7125 14.0325 10.175 14.326 10.575 14.7L21.1125 8.55C21.0625 8.375 21.0315 8.2065 21.0195 8.0445C21.0075 7.8825 21.001 7.701 21 7.5C21 6.25 21.4375 5.1875 22.3125 4.3125C23.1875 3.4375 24.25 3 25.5 3C26.75 3 27.8125 3.4375 28.6875 4.3125C29.5625 5.1875 30 6.25 30 7.5C30 8.75 29.5625 9.8125 28.6875 10.6875C27.8125 11.5625 26.75 12 25.5 12C24.9 12 24.3375 11.8935 23.8125 11.6805C23.2875 11.4675 22.825 11.174 22.425 10.8L11.8875 16.95C11.9375 17.125 11.969 17.294 11.982 17.457C11.995 17.62 12.001 17.801 12 18C11.999 18.199 11.993 18.3805 11.982 18.5445C11.971 18.7085 11.9395 18.877 11.8875 19.05L22.425 25.2C22.825 24.825 23.2875 24.5315 23.8125 24.3195C24.3375 24.1075 24.9 24.001 25.5 24C26.75 24 27.8125 24.4375 28.6875 25.3125C29.5625 26.1875 30 27.25 30 28.5C30 29.75 29.5625 30.8125 28.6875 31.6875C27.8125 32.5625 26.75 33 25.5 33ZM25.5 30C25.925 30 26.2815 29.8565 26.5695 29.5695C26.8575 29.2825 27.001 28.926 27 28.5C26.999 28.074 26.855 27.718 26.568 27.432C26.281 27.146 25.925 27.002 25.5 27C25.075 26.998 24.719 27.142 24.432 27.432C24.145 27.722 24.001 28.078 24 28.5C23.999 28.922 24.143 29.2785 24.432 29.5695C24.721 29.8605 25.077 30.004 25.5 30ZM7.5 19.5C7.925 19.5 8.2815 19.356 8.5695 19.068C8.8575 18.78 9.001 18.424 9 18C8.999 17.576 8.855 17.22 8.568 16.932C8.281 16.644 7.925 16.5 7.5 16.5C7.075 16.5 6.719 16.644 6.432 16.932C6.145 17.22 6.001 17.576 6 18C5.999 18.424 6.143 18.7805 6.432 19.0695C6.721 19.3585 7.077 19.502 7.5 19.5ZM25.5 9C25.925 9 26.2815 8.856 26.5695 8.568C26.8575 8.28 27.001 7.924 27 7.5C26.999 7.076 26.855 6.72 26.568 6.432C26.281 6.144 25.925 6 25.5 6C25.075 6 24.719 6.144 24.432 6.432C24.145 6.72 24.001 7.076 24 7.5C23.999 7.924 24.143 8.2805 24.432 8.5695C24.721 8.8585 25.077 9.002 25.5 9Z"
            fill="#5E909E"
          />
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
