import { useDispatch } from "react-redux";
import css from "./DicSearchBox.module.css"
import { setWord } from "../../redux/dict/slice";
import { useSelector } from "react-redux";
import { selectwordFilter } from "../../redux/dict/selectors";
const DicSearchBox = () => {
const dispatch = useDispatch()
const wordFilter = useSelector(selectwordFilter)
 const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setWord(e.target.value));

 }
    
    return <div className={css.wrap}>
      <img src="/image/cute-astronaut-with-laptop-min.png" alt="cute astronaut with laptop sitting on the search box" />
        <div className={css.inputwrap}>
      <input
        className={css.input}
        id="search"
        type="text"
        placeholder="Пошук..." 
        autoComplete="off"
        value={wordFilter}
        onChange={handleFilterChange}
      />
    </div>
    </div>
}

export default DicSearchBox;