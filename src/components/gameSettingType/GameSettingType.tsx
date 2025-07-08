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
}) => {
  const navigate = useNavigate();

  return (
    <div className={c.type}>
      <svg className={c.icon}>
        <use href={icon}></use>
      </svg>
      <img src={path} className={c.img} />
      <p className={c.text}>{text}</p>
      <div className={c.flex}>
        <p className={c.title}>{title}</p>
        <button
          className={c.btn}
          onClick={() => {
            navigate(`/game/${gameType}?count=${count}`);
          }}
        >
          <svg className={c.icon}>
            <use href={"/icons.svg#icon-next"}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GameSettingType;
