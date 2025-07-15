import { useEffect, useState } from "react";
import c from "./ExplosionLines.module.css";
import { curves } from "../../constants";

const ExplosionLines = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={c.result}>
      {curves.map((curve, index) => (
        <div
          key={index}
          className={`${c.curve} ${show ? c.show : ""}`}
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            transformOrigin: "center",
            transform: show
              ? `translate(${curve.offsetX}px, ${curve.offsetY}px) scale(1)`
              : `translate(0, 0) scale(0)`,
          }}
        >
          <svg width="60" height="60" id={curve.id}>
            <use href={`/rezult.svg#${curve.id}`} />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default ExplosionLines;
