import React, { useState } from "react";
import c from "./Star.module.css";

type Props = {
  total?: number;
  onRate?: (value: number) => void;
};

const Star: React.FC<Props> = ({ total = 5, onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (value: number) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  return (
    <div className={c.starWrap}>
      {[...Array(total)].map((_, i) => {
        const index = i + 1;
        const isActive = index <= (hover ?? rating);

        return (
          <svg
            key={index}
            className={`${c.star} ${isActive ? c.active : ""}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            <use href="/icons.svg#icon-big-star" />
          </svg>
        );
      })}
    </div>
  );
};

export default Star;
