import type React from "react";
import s from "./Feedback.module.css";
import { useState } from "react";
import api from "../../api/axios";

type FeedbackProps = {
  rating: number;
};

const Feedback: React.FC<FeedbackProps> = ({ rating }) => {
  const [comment, setComment] = useState<string>("");

  const message = async () => {
    const send = await api.post("/feedback", { comment, rating });

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
