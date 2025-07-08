import React, { useState } from "react";
import c from "./Star.module.css";
import type { StarProps } from "../../utils/gameType";

const Star: React.FC<StarProps> = ({ total = 5, setRating, rating }) => {
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className={c.starWrap}>
      {[...Array(total)].map((_, i) => {
        const index = i + 1;
        const isActive = index <= (hover ?? rating);

        return (
          <svg
            key={index}
            className={c.star}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
          >
            {isActive ? (
              <use href="/icons.svg#icon-star-fill" />
            ) : (
              <use href="/icons.svg#icon-big-star" />
            )}
          </svg>
        );
      })}
    </div>
  );
};

export default Star;
