import React from "react";
import "./QuestionProgressBar.css";

type Props = {
  total: number;
  currentIndex: number; // індекс поточного питання (від 0 до total-1)
};

const QuestionProgressBar: React.FC<Props> = ({ total, currentIndex }) => {
  const bars = Array.from({ length: total }, (_, index) => {
    if (index < currentIndex) return "passed";
    if (index === currentIndex) return "current";
    return "pending";
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
