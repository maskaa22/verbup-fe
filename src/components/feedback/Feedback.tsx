import type React from "react";
import s from "./Feedback.module.css";
import { useState } from "react";

const Feedback: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  return (
    <>
      <textarea
        className={s.text}
        placeholder="Ваша думка важлива для нас!"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={s.btn} onClick={() => console.log(message)}>
        Надіслати відгук
      </button>
    </>
  );
};

export default Feedback;
