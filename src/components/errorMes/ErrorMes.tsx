import { useEffect, useState } from "react";
import css from "./ErrorMes.module.css"
import { createPortal } from 'react-dom'

type PrankModalProps = {
  open: boolean;
  onClose?: () => void;
};
const ErrorMes: React.FC<PrankModalProps> = ({open, onClose}) => {
    const [count, setCount] = useState<number>(10);
     const [visible, setVisible] = useState<boolean>(open);
     useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    if (!visible) return;

    // Prevent background scroll while prank is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Countdown logic
    const interval = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (count <= 0 && visible) {
      setVisible(false);
      onClose?.();
    }
  }, [count, visible, onClose]);

  return createPortal(
    <div className={css.errorMess}>
    <p>{`Була допущена помилка!Приготуйтесь Програма знищення буде запущена через ${count} секунд.`}</p>
      </div>, document.body
  )
}

export default ErrorMes
