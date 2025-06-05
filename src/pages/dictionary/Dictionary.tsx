import DickTable from "../../components/dickTable/DickTable"
import Logo from "../../components/logo/Logo";
import s from "./Dictionary.module.css";

const Dictionary = () => {
  return <div className={`${s.div} ${"container"}`}>
    <Logo/>
    <h2 className={s.dicheadline}>словник</h2>
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
