import DickTable from "../../components/dictTable/DictTable"
import DicSearchBox from "../../components/dicSearchBox/DicSearchBox";
import Logo from "../../components/logo/Logo";
import s from "./Dictionary.module.css";

const Dictionary = () => {
  return <div className={`${s.div} container`}>
    <Logo/>
    <h2 className={s.dicheadline}>словник</h2>
    <DicSearchBox/>
    <DickTable/>
  </div>;
};

export default Dictionary;
