import React, { useState } from "react";
import c from "./WordGame.module.css";
import BaseComponentGame from "../baseComponentGame/BaseComponentGame";
import BaseButtonGame from "../baseButtonGame/BaseButtonGame";

const WordGame = () => {
  const [current, setCurrent] = useState(0);
  const totalQuestions = 10;
  const imgWrite = "/image/game/fly.png";

  const btnText = [
    { name: "flown" },
    { name: "flew" },
    { name: "flow" },
    { name: "fly" },
  ];
  return (
    <div>
      <BaseComponentGame
        current={current}
        totalQuestions={totalQuestions}
        img={imgWrite}
        question={"Which is the Past simple (V2) of “fly”?"}
      />

      <div className={c.buttonContainer}>
        {btnText.map((btn) => (
          <button className={c.btn}>{btn.name}</button>
        ))}
      </div>
      <BaseButtonGame totalQuestions={totalQuestions} setCurrent={setCurrent}/>
    </div>
  );
};

export default WordGame;
