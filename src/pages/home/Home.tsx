

import ProgressBar from "../../components/progressBar/ProgressBar";
import ResultCards from "../../components/resultCards/ResultCards";
import StartLink from "../../components/startLink/StartLink";
import WeekCal from "../../components/weekCal/WeekCal";
import css from "./Home.module.css";

const Home = () => {
  // const progressPath = "M9.975 31.086c-0.686 0.861-1.947 1.006-2.743 0.246-1.738-1.662-3.214-3.579-4.372-5.694l-0.061-0.122c-1.413-2.572-2.373-5.587-2.687-8.791l-0.008-0.096c-0.067-0.665-0.105-1.437-0.105-2.218 0-2.507 0.394-4.922 1.122-7.186l-0.046 0.166c0.797-2.5 1.905-4.674 3.305-6.624l-0.048 0.070c0.638-0.897 1.904-0.993 2.741-0.277l0.59 0.505c0.832 0.712 0.922 1.957 0.306 2.862-0.97 1.407-1.775 3.030-2.333 4.764l-0.037 0.132c-0.543 1.671-0.857 3.593-0.857 5.589 0 0.622 0.030 1.236 0.090 1.843l-0.006-0.077c0.256 2.628 1.020 5.028 2.193 7.172l-0.049-0.097c0.908 1.668 1.988 3.102 3.247 4.356l0.001 0.001c0.776 0.773 0.923 2.012 0.241 2.869l-0.486 0.61z"
  return <div className={css.homeWrap}>
    <ProgressBar/>
    {/* <p>Не дивись сюди, це ще не дороблено...</p>
<NewProgressBar path={progressPath} progress={0.1}/> */}
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
