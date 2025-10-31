// import { useEffect, useState } from "react";
import css from "./ErrorMes.module.css";
import { createPortal } from "react-dom";

type PrankModalProps = {
  message: number;
  onClose?: () => void;
};
const ErrorMes: React.FC<PrankModalProps> = ({ message, onClose }) => {
  // const [count, setCount] = useState<number>(10);
  // const [visible, setVisible] = useState<boolean>(false);
  // useEffect(() => {
  //   if (message) setVisible(true);
  // }, [open]);

  // useEffect(() => {
  //   if (!visible) return;

  //   // Prevent background scroll while prank is visible
  //   const prevOverflow = document.body.style.overflow;
  //   document.body.style.overflow = "hidden";

  //   // Countdown logic
  //   const interval = setInterval(() => {
  //     setCount((c) => c - 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //     document.body.style.overflow = prevOverflow;
  //   };
  // }, [visible]);

  // useEffect(() => {
  //   console.log(visible)
  //   if (count <= 0 && visible) {
  //     setVisible(false);
  //     onClose?.();
  //   }
  // }, [count, visible, onClose]);


  return createPortal(
    <div>
      <div className={css.backdrop}></div>
      <div className={css.errorMess}>
        <button onClick={() => onClose?.()} className={css.button}>X</button>
        {message === 400 ? (
          <h3>Ви ввели невірні данні, спробуйте ще раз</h3>
        ) : message === 401 ? <h3>Вибачте, виникла помилка. Спробуйте ще раз</h3> : message === 403 ? <h3>Ваш аккаунт не підтверджений. Перевірте свою пошту.</h3> : (
          <h3>Ця пошта вже використовується, спробуйте іншу</h3>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ErrorMes;
