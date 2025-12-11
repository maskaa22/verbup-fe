import { useSelector } from "react-redux";
import ProgressTracker from "../progressTracker/ProgressTracker";
import css from "./ProgressBar.module.css";
import { selectppProgress, selectpsProgress } from "../../redux/progress/selectors";

const ProgressBar = () => {
  const radius = 100;
  const strokeWidth = 30;
  const circumference = 2 * Math.PI * radius;
const psProgress = useSelector(selectpsProgress)
const ppProgress = useSelector(selectppProgress)
const normPsProgress = psProgress.length / 200;
const normPpProgress = ppProgress.length / 200;
  const arcLength = (1 / 6) * circumference;
  return (
    <div className={css.progressWrap}>
      <img
        className={css.astroHome}
        src="/image/cute-astronaut-home-page.png"
        alt="cute astronaut is reading his journal"
      />
      <div className={css.progressTrWrap}>
        <ProgressTracker
          radius={radius}
          strokeWidth={strokeWidth}
          arcLength={arcLength}
          circumference={circumference}
          type="base"
          progress={0.01}
        />
        <ProgressTracker
          radius={radius}
          strokeWidth={strokeWidth}
          arcLength={arcLength}
          circumference={circumference}
          type="ps"
          progress={normPsProgress}
        />
        <ProgressTracker
          radius={radius}
          strokeWidth={strokeWidth}
          arcLength={arcLength}
          circumference={circumference}
          type='pp'
          progress={normPpProgress}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
