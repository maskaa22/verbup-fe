import type React from "react";
import s from "./Feedback.module.css";
import { useState } from "react";
import api from "../../api/axios";

type FeedbackProps = {
  rating: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Feedback: React.FC<FeedbackProps> = ({ rating, setShowModal }) => {
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState(false);

  const message = async () => {
    if (comment.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    await api.post("/feedback", { comment, rating });

    setShowModal(true);
    setComment("");
  };

  return (
    <>
      <textarea
        className={`${s.text} ${error ? s.error : ""}`}
        placeholder="Ваша думка важлива для нас!"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
          if (error) setError(false);
        }}
      />
      <button className={s.btn} onClick={message}>
        Надіслати відгук
      </button>
    </>
  );
};

export default Feedback;
