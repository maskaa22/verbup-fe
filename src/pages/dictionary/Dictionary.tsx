import DictTable from "../../components/dictTable/DictTable"
import DicSearchBox from "../../components/dicSearchBox/DicSearchBox";
import Logo from "../../components/logo/Logo";
import s from "./Dictionary.module.css";
import DictABCFilter from "../../components/dictABCFilter/DictABCFilter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchWords } from "../../redux/dict/operations";
import type { AppDispatch } from "../../redux/store";

const Dictionary = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchWords())
  }, [])
  return <div className={`${s.div} container`}>
    <Logo/>
    <h2 className={s.dicheadline}>словник</h2>
    <DicSearchBox/>
    <DictABCFilter/>
    <DictTable/>
  </div>;
};

export default Dictionary;
