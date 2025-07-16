import React from "react";
import c from "./Keyboard.module.css";

type Props = {
  onKeyPress: (value: string) => void;
  onBackspace?: () => void;
  onEnter?: () => void;
};

const layout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const Keyboard: React.FC<Props> = ({ onKeyPress, onBackspace }) => {
  return (
    <div className={c.keyboard}>
      {layout.map((row, rowIndex) => (
        <div className={c.keyboardRow} key={rowIndex}>
          {row.map((key) => (
            <button
              key={key}
              className={c.keyboardKey}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
          {rowIndex === 2 && (
            <>
              <button className={c.special} onClick={onBackspace}>
                <img src="./image/game/delete-icon.svg" />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
