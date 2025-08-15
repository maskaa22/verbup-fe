import css from "./ProgressBar.module.css"

const ProgressBar = ({progress = 0.1}) => {
    const radius = 80;
    const strokeWidth = 30;
    const circumference = 2 * Math.PI * radius;

    const arcLength = (3/4) * circumference;
    const progressPrc = progress * 100;
    const progressLength = Math.round(arcLength * progressPrc / 100);
    // const offset = arcLength - progress * arcLength;
    // const dashOffset = (1 - progress) * arcLength;

    return <div className={css.progressWrap}>
    <img className={css.astroHome} src="/image/cute-astronaut-home-page.png" alt="cute astronaut is reading his journal" />
     <svg className={css.progress} viewBox="0 0 200 200">
        {/* Background arc */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        stroke="#f0f0f0"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={arcLength}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform="rotate(135 100 100)" // makes it 3/4 circle
      />

      {/* Progress arc */}
      <circle
        cx="100"
        cy="100"
        r={radius}
        stroke="#5e909e"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progressLength}
        strokeLinecap="round"
        transform="rotate(135 100 100)"
      />

      {/* Text in the center */}
      {/* <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
      >
        {Math.round(progress * 100)}%
      </text> */}
    </svg>
    </div>
}

export default ProgressBar