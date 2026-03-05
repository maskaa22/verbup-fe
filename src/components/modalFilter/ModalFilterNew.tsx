import { useEffect, useRef } from "react";
import css from "./ModalFilter.module.css";
import { ALPHABET, FAVORITE, LEARNED, NOT_STUDIED} from "../../constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
};

const ModalFilterNew = ({
  isOpen,
  onClose,
  value,
  onChange,
  wrapperRef,
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;

    if (
      wrapperRef.current &&
      modalRef.current &&
      !wrapperRef.current.contains(target) &&
      !modalRef.current.contains(target)
    ) {
      onClose();
    }
  };

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen, onClose, wrapperRef]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className={css.modal}>
      <p className={css.title}>Сортування</p>
      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value={ALPHABET}
          checked={value === ALPHABET}
          onChange={(e) => onChange(e.target.value)}
        />
        абетка
      </label>

      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value={FAVORITE}
          checked={value === FAVORITE}
          onChange={(e) => onChange(e.target.value)}
        />
        улюблені
      </label>

      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value={LEARNED}
          checked={value === LEARNED}
          onChange={(e) => onChange(e.target.value)}
        />
        вивчені
      </label>
      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value={NOT_STUDIED}
          checked={value === NOT_STUDIED}
          onChange={(e) => onChange(e.target.value)}
        />
        не вивчені
      </label>

      {/* <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value={INFINITIVE}
          checked={value === INFINITIVE}
          onChange={(e) => onChange(e.target.value)}
        />
        перша форма (Infinitive)
      </label>

      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value={PS}
          checked={value === PS}
          onChange={(e) => onChange(e.target.value)}
        />
        друга форма (Past Simple)
      </label>
      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value={PP}
          checked={value === PP}
          onChange={(e) => onChange(e.target.value)}
        />
        третя форма (Past Participle)
      </label> */}
    </div>
  );
};

export default ModalFilterNew;
