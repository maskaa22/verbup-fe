
import ProgressBar from "../../components/progressBar/ProgressBar";
import ResultCards from "../../components/resultCards/ResultCards";
import StartLink from "../../components/startLink/StartLink";
import WeekCal from "../../components/weekCal/WeekCal";
import css from "./Home.module.css";

const Home = () => {
  return <div className={css.homeWrap}>
    <ProgressBar/>
    <div className={css.card}>
      <div className={css.userInfo}>
        <h3>User</h3>
        <p>Level</p>
      </div>
      <WeekCal/>
      <ul className={css.list}>
        <ResultCards value={0} icon={"icon-yes"} text={"Вивчено"}/>
        <ResultCards value={0} icon={"icon-star"} text={"Бали"}/>
        <ResultCards value={0} icon={"icon-fire"} text={"Досягнення"}/>
      </ul>
      

    <StartLink/>
    </div>
    
  </div>;
};

export default Home;
