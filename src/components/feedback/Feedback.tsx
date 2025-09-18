import type React from "react";
import s from "./Feedback.module.css";
import { useState } from "react";
import api from "../../api/axios";
import { getTokenFromStorage } from "../../redux/game/operations";

const Feedback: React.FC = ({ rating }) => {
  const [comment, setComment] = useState<string>("");

  const message = async () => {
    console.log(comment);
    console.log(rating);
const token = getTokenFromStorage();

    const send = await api.post("/feedback", { headers: { Authorization: `Bearer ${token}`}, comment, rating });

    if (send) {
      console.log("GOOD");
    }
  };

  return (
    <>
      <textarea
        className={s.text}
        placeholder="Ваша думка важлива для нас!"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className={s.btn} onClick={message}>
        Надіслати відгук
      </button>
    </>
  );
};

export default Feedback;
