import clsx from "clsx";
import css from "./ProgressTracker.module.css";
export interface ProgresProps {
  radius: number;
  strokeWidth: number;
  arcLength: number;
  circumference: number;
  type: string;
  progress: number;
}
const ProgressTracker: React.FC<ProgresProps> = ({
  radius,
  strokeWidth,
  arcLength,
  circumference,
  type,
  progress,
}) => {
  const progressLength = arcLength * progress;

  const handleClass = () => {
    return clsx(
      css.progress,
      type === "base" ? css.baseForm : type === "ps" ? css.psForm : css.ppForm
    );
  };
  return (
    <>
      <svg className={handleClass()} viewBox="0 0 250 250">
        {/* Background arc */}
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
          transform="rotate(45 100 100)" // adjust which quadrant it appears in
        />

        {/* Progress arc */}
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
      </svg>
    </>
  );
};

export default ProgressTracker;
