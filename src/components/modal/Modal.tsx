import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
  autoClose?: number;
  showCloseButton?: boolean;
}
const Modal = ({
  onClose,
  children,
  autoClose,
  showCloseButton = true,
}: ModalProps) => {
  useEffect(() => {
    if (!autoClose || !onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoClose);

    return () => clearTimeout(timer);
  }, [autoClose, onClose]);

  return createPortal(
    <div>
      <div className={css.backdrop}></div>
      <div className={css.errorMess}>
        {showCloseButton && onClose && (
          <button onClick={onClose} className={css.button}>
            X
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
