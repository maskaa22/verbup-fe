import { useEffect, useRef } from "react";
import css from "./ModalFilter.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
};

const ModalFilter = ({
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
      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value="alphabet"
          checked={value === "alphabet"}
          onChange={(e) => onChange(e.target.value)}
        />
        абетка
      </label>

      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value="favorite"
          checked={value === "favorite"}
          onChange={(e) => onChange(e.target.value)}
        />
        улюблені
      </label>

      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value="learned"
          checked={value === "learned"}
          onChange={(e) => onChange(e.target.value)}
        />
        вивчені
      </label>
      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value="notStudied"
          checked={value === "notStudied"}
          onChange={(e) => onChange(e.target.value)}
        />
        не вивчені
      </label>

      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value="infinitive"
          checked={value === "infinitive"}
          onChange={(e) => onChange(e.target.value)}
        />
        перша форма (Infinitive)
      </label>

      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value="ps"
          checked={value === "ps"}
          onChange={(e) => onChange(e.target.value)}
        />
        друга форма (Past Simple)
      </label>
      <label className={css.radioItem}>
        <input
          type="radio"
          name="filter"
          value="pp"
          checked={value === "pp"}
          onChange={(e) => onChange(e.target.value)}
        />
        третя форма (Past Participle)
      </label>
    </div>
  );
};

export default ModalFilter;
