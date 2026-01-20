import clsx from "clsx";
import css from "./NotificationCheckBox.module.css";

interface NotificationCheckBoxProps {
  checked: boolean;
  onChange: () => void;
}

const NotificationCheckBox: React.FC<NotificationCheckBoxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div className={css.checkbox}>
      <label className={css.switch}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={clsx(css.slider, css.round)}></span>
      </label>
    </div>
  );
};

export default NotificationCheckBox;
