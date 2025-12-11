
import { useEffect } from "react";
import ProgressBar from "../../components/progressBar/ProgressBar";
import ResultCards from "../../components/resultCards/ResultCards";
import StartLink from "../../components/startLink/StartLink";
import WeekCal from "../../components/weekCal/WeekCal";
import css from "./Home.module.css";
import { useDispatch } from "react-redux";
import { getProgress } from "../../redux/progress/operations";
import type { AppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectppProgress, selectpsProgress } from "../../redux/progress/selectors";
import { selectUser } from "../../redux/auth/selectors";


const Home = () => {
  const user = useSelector(selectUser)
  const psProgress = useSelector(selectpsProgress)
  const ppProgress = useSelector(selectppProgress)
  const psNoMistake = psProgress.filter(word => word.status !== "mistake")
  const ppNoMistake = ppProgress.filter(word => word.status !== "mistake")
  const dispatch = useDispatch<AppDispatch>()
  const ps = psNoMistake?.length || 0
  const pp = ppNoMistake?.length || 0
  const totalProgress = ps + pp;
  useEffect(() => {
    dispatch(getProgress())
  }, []);

  return (
    <div className={css.homeWrap}>
      <ProgressBar />
      <div className={css.card}>
        <div className={css.userInfo}>
          <h3>{user ? user.name : "User"}</h3>
        </div>
        <WeekCal />
        <ul className={css.list}>
          <ResultCards value={totalProgress} icon={"icon-yes"} text={"Вивчено"} />
          <ResultCards value={0} icon={"icon-star"} text={"Бали"} />
          <ResultCards value={0} icon={"icon-fire"} text={"Досягнення"} />
        </ul>

        <StartLink />
      </div>
    </div>
  );
};

export default Home;
