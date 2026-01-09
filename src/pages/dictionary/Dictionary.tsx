import DictTable from "../../components/dictTable/DictTable";
import DicSearchBox from "../../components/dicSearchBox/DicSearchBox";
import css from "./Dictionary.module.css";
import DictABCFilter from "../../components/dictABCFilter/DictABCFilter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWords } from "../../redux/dict/operations";
import type { AppDispatch } from "../../redux/store";
import { setLearnt } from "../../redux/dict/slice";
import { useSelector } from "react-redux";
import { selectLearntVerbs } from "../../redux/dict/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Dictionary = () => {
  const showLearnt = useSelector(selectLearntVerbs);
  const loggedin = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  const handleToggle = () => {
    dispatch(setLearnt());
  };
  return (
    <div className={css.div}>
      <h2 className={css.dicheadline}>словник</h2>
      <DicSearchBox />
      <DictABCFilter />
      {loggedin && (
        <div className={css.checkboxLearntWrap}>
          <span>Show learnt only:</span>
          <span
            className={`${css.checkboxLearnt} ${showLearnt && css.checked}`}
            onClick={handleToggle}
          ></span>
        </div>
      )}
      <DictTable />
    </div>
  );
};

export default Dictionary;
