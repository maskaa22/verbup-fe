import DictItem from "../dictItem/DictItem";
import css from "./DictTable.module.css"
import { useSelector } from "react-redux";
import { visibleWordsStore } from "../../redux/dict/selectors";




const DickTable = () => {
const visibleVerbs = useSelector(visibleWordsStore);
if(!visibleVerbs){
    return <div className={css.noWordsWrap}>
      <p>couldn't fetch the verbs</p>
    </div>;
}
if(visibleVerbs.length <= 0){
  return <div className={css.noWordsWrap}>
    <p>Нічого собі... На цю букву взагалі немає слів!</p>
    <img src="/image/cute-astronaut-no-min.png" alt="cute astronaut with laptop sitting on the search box" />
  </div>
}

const myVerbs = visibleVerbs;
return <div className={css.wrap}>
    <ul className={css.table}>

    {myVerbs.map((verb, idx) => (
        <li key={idx} >
     <DictItem word={verb}/>
      </li>
    ))}
    <li className={css.bgi} key={"bgi"}></li>
</ul>
</div>
};
export default DickTable;

