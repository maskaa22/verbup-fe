import React from "react";
import c from "./Keyboard.module.css";

type Props = {
  onKeyPress: (value: string) => void;
  onBackspace?: () => void;
  onEnter?: () => void;
};

const layout = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

const Keyboard: React.FC<Props> = ({ onKeyPress, onBackspace, onEnter }) => {
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
              <button className="keyboardKey special" onClick={onBackspace}>←</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
