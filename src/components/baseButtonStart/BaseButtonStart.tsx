import css from "./BaseButtonStart.module.css"
import type { ButtonHTMLAttributes } from "react";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const BaseButtonStart: React.FC<SubmitButtonProps> =({label = "submit", ...props}) => {
return (
    <button className={css.button} type="submit" {...props}>
      {label}
    </button>
  );
}

export default BaseButtonStart;