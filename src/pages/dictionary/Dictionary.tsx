import DictTable from "../../components/dictTable/DictTable"
import DicSearchBox from "../../components/dicSearchBox/DicSearchBox";
import s from "./Dictionary.module.css";
import DictABCFilter from "../../components/dictABCFilter/DictABCFilter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWords, getProgress } from "../../redux/dict/operations";
import type { AppDispatch } from "../../redux/store";
// import CuteAstronautWithLaptop from 

const Dictionary = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getProgress())
    dispatch(fetchWords())
  }, [dispatch])
  return <div className={s.div}>
    <h2 className={s.dicheadline}>словник</h2>
    <DicSearchBox/>
    <DictABCFilter/>
    <DictTable/>
  </div>;
};

export default Dictionary;
