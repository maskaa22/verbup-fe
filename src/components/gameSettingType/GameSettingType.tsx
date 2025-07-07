import { useNavigate } from "react-router-dom";
import c from "./GameSettingType.module.css";
import { useSelector } from "react-redux";
import { selectQueries } from "../../redux/game/selectors";
import { useEffect } from "react";
import { baseQuestion } from "../../redux/game/slice";
import { useDispatch } from "react-redux";
const GameSettingType = ({ icon, text, title, path, count, gameType }) => {

  const navigate = useNavigate();

  //  const questions = useSelector(selectQueries);


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
