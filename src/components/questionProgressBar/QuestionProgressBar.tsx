import React from "react";
import "./QuestionProgressBar.css";
import type { progressBarProps } from "../../utils/gameType";

const QuestionProgressBar: React.FC<progressBarProps> = ({
  total,
  currentIndex,
  answerStatuses,
}) => {
  const bars = Array.from({ length: total }, (_, index) => {
    if (index === currentIndex && answerStatuses[index] === "pending") {
      return "current";
    }
    return answerStatuses[index]; // "passed", "error" або "pending"
  });

  return (
    <div className="progress-container">
      {bars.map((status, i) => (
        <div key={i} className={`progress-segment ${status}`} />
      ))}
    </div>
  );
};

export default QuestionProgressBar;
