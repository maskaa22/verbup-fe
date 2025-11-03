
import { useEffect } from "react";
import ProgressBar from "../../components/progressBar/ProgressBar";
import ResultCards from "../../components/resultCards/ResultCards";
import StartLink from "../../components/startLink/StartLink";
import WeekCal from "../../components/weekCal/WeekCal";
import css from "./Home.module.css";
// import { useSelector } from "react-redux";
// import { selectProgress } from "../../redux/progress/selectors";
import { useDispatch } from "react-redux";
import { getProgress } from "../../redux/progress/operations";
import type { AppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectppProgress, selectpsProgress } from "../../redux/progress/selectors";


const Home = () => {
  const psProgress = useSelector(selectpsProgress)
  const ppProgress = useSelector(selectppProgress)
  // useEffect(() => console.log(progress), [progress])
  const dispatch = useDispatch<AppDispatch>()
  const ps = psProgress?.length || 0
  const pp = ppProgress?.length || 0
  const totalProgress = ps + pp;
  useEffect(() => {
    dispatch(getProgress())
  }, []);

  return (
    <div className={css.homeWrap}>
      <ProgressBar />
      <div className={css.card}>
        <div className={css.userInfo}>
          <h3>User</h3>
          <p>Level</p>
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
