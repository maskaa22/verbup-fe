import DickTable from "../../components/dickTable/DickTable"
import DicSearchBox from "../../components/dicSearchBox/DicSearchBox";
import Logo from "../../components/logo/Logo";
import s from "./Dictionary.module.css";

const Dictionary = () => {
  return <div className={s.div}>
    <Logo/>
    <h2 className={s.dicheadline}>словник</h2>
    <DicSearchBox/>
    <div className={s.markup}>
      <ul>
        <li>
          <div className={s.color}></div>
          <p>Вивчені</p>
        </li>
        <li>
          <div className={s.color}></div>
          <p>У процесі</p>
        </li>
        <li>
          <div className={s.color}></div>
          <p>Старайся</p>
        </li>
      </ul>
    </div>
    <DickTable/>
  </div>;
};

export default Dictionary;
