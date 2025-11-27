import { createPortal } from 'react-dom';
import css from './Modal.module.css'

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}
const Modal = ({onClose, children} : ModalProps) => {
  return (
    createPortal(
        <div>
          <div className={css.backdrop}></div>
          <div className={css.errorMess}>
            <button onClick={() => onClose?.()} className={css.button}>
              X
            </button>
            {children}
          </div>
        </div>,
        document.body
      )
  )
}

export default Modal
