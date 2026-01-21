import type { ReactNode } from "react";
import css from "./Tooltip.module.css";
import clsx from "clsx";

type Props = {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom";
};

const Tooltip = ({ text, children, position = "top" }: Props) => {
  return (
    <span className={css.wrapper}>
      {children}
      <span className={clsx(css.tooltip, css[position])}>{text}</span>
    </span>
  );
};

export default Tooltip;
