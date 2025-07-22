import { NavLink, useNavigate } from "react-router-dom";
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
    <div className={`${c.type} ${disabled ? c.disabled : ""}`}>
      <svg className={`${c.icon} ${disabled ? c.disIcon : ""}`}>
        <use href={icon}></use>
      </svg>
      {disabled}
      <img src={path} className={`${c.img} ${disabled ? c.repair : ""}`} />
      <p className={`${c.text} ${disabled ? c.disTitle : ""}`}>{text}</p>
      <div className={c.flex}>
        <p className={`${c.title} ${disabled ? c.disTitle : ""}`}>{title}</p>
        <div className={`${c.iconContainer} ${disabled ? c.iconDisabled : ""}`}>
          <svg
            className={c.icon}
            onClick={
              !disabled
                ? () => navigate(`/game/${gameType}?count=${count}`)
                : undefined
            }
          >
            <use href={"/icons.svg#icon-next"}></use>
          </svg>
          <svg className={c.icon}>
            <use href={"/icons.svg#icon-line"}></use>
          </svg>
          <NavLink className={c.link} to="/setting/game">
            <svg className={c.settings}>
              <use href={"/icons.svg#icon-settings-check"}></use>
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default GameSettingType;
