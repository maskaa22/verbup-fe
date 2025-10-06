import ProgressTracker from "../progressTracker/ProgressTracker";
import css from "./ProgressBar.module.css"

const ProgressBar = ({progress = 0.01}) => {
    const radius = 80;
const strokeWidth = 30;
const circumference = 2 * Math.PI * radius;

// quarter circle
const arcLength = (1 / 4) * circumference;
const progressLength = arcLength * progress;

return (
  <div className={css.progressWrap}>
    <img
      className={css.astroHome}
      src="/image/cute-astronaut-home-page.png"
      alt="cute astronaut is reading his journal"
    />
    <div className={css.progressTrWrap}>
<ProgressTracker radius={radius} strokeWidth={strokeWidth} arcLength={arcLength} circumference={circumference} progressLength={progressLength} rotate={80}/>
    <ProgressTracker radius={radius} strokeWidth={strokeWidth} arcLength={arcLength} circumference={circumference} progressLength={progressLength} rotate={180}/>
    <ProgressTracker radius={radius} strokeWidth={strokeWidth} arcLength={arcLength} circumference={circumference} progressLength={progressLength} rotate={280}/>
</div>

    {/* <svg className={css.progress} viewBox="0 0 200 200">
      <circle
        cx="100"
        cy="100"
        r={radius}
        stroke="#f0f0f0"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform="rotate(45 100 100)" 
      />
      <circle
        cx="100"
        cy="100"
        r={radius}
        stroke="#5e909e"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeDashoffset={arcLength - progressLength}
        strokeLinecap="round"
        transform="rotate(45 100 100)"
      />
    </svg> */}
    
  </div>
);

}

export default ProgressBar