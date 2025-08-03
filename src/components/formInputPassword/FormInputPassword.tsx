import { useEffect, useState } from "react";
import css from "./FormInputPassword.module.css";
import { useField } from "formik";
import ValidPassword from "../validPassword/ValidPassword";
import clsx from "clsx";

const FormInputPassword = () => {
  const [field] = useField("password");
  const [valid, setValid] = useState({
    a: false,
    A: false,
    num: false,
    sym: false,
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const value = field.value;
    setValid({
      a: /[a-z]/.test(value),
      A: /[A-Z]/.test(value),
      num: /\d/.test(value),
      sym: /[^\w]/.test(value),
    });
  }, [field.value]);
  return (
    <div>
      <label htmlFor="password" className={css.label}>
        Пароль
      </label>
      <div className={css.inputWrap}>
      <input
        {...field}
        type={visible ? "text" : "password"}
        className={css.input}
        placeholder=" "
        autoComplete="off"
        required
      />
      <svg className={css.icon}>
        <use href="./icons.svg#icon-password"></use>
      </svg>
      <span className={css.eye} onClick={() => setVisible(!visible)}>
        <svg className={clsx(css.iconEye, visible ? css.iconEyeSee : css.iconEyeHide) }>
          <use
            href={`./icons.svg#${
              visible ? "icon-password-hide" : "icon-password-see"
            }`}
          ></use>
        </svg>
      </span>
      </div>
      <ValidPassword isValid={valid} />
    </div>
  );
};

export default FormInputPassword;
