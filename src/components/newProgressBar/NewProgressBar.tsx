import React, { useRef, useEffect, useState } from "react";
import css from "./NewProgressBar.module.css";
interface ProgressArcProps {
  path: string; // SVG path string, e.g. "M 50 100 A 50 50 0 0 1 150 100"
  progress: number; // between 0 and 1
  strokeWidth?: number;
  bgColor?: string;
  progressColor?: string;
}

const NewProgressBar: React.FC<ProgressArcProps> = ({
  path,
  progress,
  strokeWidth = 0.1988,
  bgColor = "#5e909e",
  progressColor = "#5e909e",
}) => {
  const progressRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (progressRef.current) {
      const length = progressRef.current.getTotalLength();
      setPathLength(length);
    }
  }, [path]);

  return (
    <div>
    <svg className={css.icon} width="300" height="300" viewBox="0 0 35 35">
      {/* background arc */}
      <path
        d={path}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="#f0f0f0"
      />

      {/* progress arc */}
      <path
        ref={progressRef}
        d={path}
        fill={progressColor}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - progress)}
      />
    </svg>
    </div>
  );
};

export default NewProgressBar;
