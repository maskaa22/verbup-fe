import { Link, useSearchParams } from "react-router-dom";
import css from "./VerifyEmail.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { verify } from "../../redux/auth/operations";
import Logo from "../../components/logo/Logo";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const token = searchParams.get("token");
  console.log(token);
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;
      dispatch(verify(token));
    };

    if (token) verifyEmail();
  }, [token]);
  return (
    <div className={`${css.wrap} container`}>
      <div className={css.logoWrap}>
        <Logo />
      </div>
      {token ? (
        <div className={css.textWrap}>
          <h3>Дякую за реєстрацію</h3>
          <p>Тепер твій прогрес буде зберігатись</p>
          <Link className={css.link} to="/signin">
            Увійти
          </Link>
        </div>
      ) : (
        <div className={css.textWrap}>
          <h3>Підтвердження пошти</h3>
          <p>
            Перевірте свою електронну пошту. Якщо листа немає, також перевірте
            папку спам
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
