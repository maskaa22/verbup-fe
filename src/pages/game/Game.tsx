import s from "./Game.module.css";
import WriteGame from "../../components/writeGame/WriteGame.js";
import WordGame from "../../components/wordGame/WordGame.js";

const Game = () => {
  return (
    <div className={s.container}>
      <WriteGame />
      <WordGame/>
    </div>
  );
};

export default Game;
