import React, { useEffect, useState } from "react";
import c from "./MotivationModal.module.css";
import type { MotivationItem } from "../../utils/gameType";
import { motivationData } from "../../constants";
import ExplosionLines from "../explosionLines/ExplosionLines";

interface MotivationModalProps {
  onClose: () => void;
}

const MotivationModal: React.FC<MotivationModalProps> = ({ onClose }) => {
  const [item, setItem] = useState<MotivationItem | null>(null);

  useEffect(() => {
    const randIndex = Math.floor(Math.random() * motivationData.length);
    setItem(motivationData[randIndex]);
  }, []);

  if (!item) return null;
  

  return (
    <div className={c.overlay}>
        <ExplosionLines />
      <div className={c.modal}>
        <p className={c.textWrapper}>{item.message}</p>
        <img src={item.image} alt="motivation" className={c.imgWrapper} onClick={onClose}/>

        {/* <button onClick={onClose}>Закрити</button> */}
      </div>
    </div>
  );
};

export default MotivationModal;
