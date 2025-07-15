import { useNavigate } from "react-router-dom";
import c from "./GameSettingType.module.css";
import type React from "react";
import type { GameSettingTypeProps } from "../../utils/gameType";

const GameSettingType: React.FC<GameSettingTypeProps> = ({
  icon,
  text,
  title,
  path,
  count,
  gameType,
  disabled,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${c.type} ${disabled ? c.disabled : ""}`}
      onClick={
        !disabled
          ? () => navigate(`/game/${gameType}?count=${count}`)
          : undefined
      }
    >
      <svg className={c.icon}>
        <use href={icon}></use>
      </svg>
      {disabled}
      <img src={path} className={`${c.img} ${disabled ? c.repair : ""}`} />
      <p className={c.text}>{text}</p>
      <div className={c.flex}>
        <p className={`${c.title} ${disabled ? c.disTitle : ""}`}>{title}</p>
        <svg className={c.icon}>
          <use href={"/icons.svg#icon-next"}></use>
        </svg>
      </div>
    </div>
  );
};

export default GameSettingType;
