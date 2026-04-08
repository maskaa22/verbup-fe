import { useEffect, useState } from "react";
import PetalsCanvas from "../../components/petalsCanvas/PetalsCanvas";
import css from "./Achievement.module.css";
import { achievements } from "../../constants/chievements";



const Achievement: React.FC = () => {
  const [userAchievements, setUserAchievements] = useState<any>({});
  const [flipped, setFlipped] = useState<number[]>([]);

  // 📦 завантаження з localStorage
  useEffect(() => {
    const saved = localStorage.getItem("achievements");
    if (saved) {
      setUserAchievements(JSON.parse(saved));
    }
  }, []);

  // 💾 збереження
  useEffect(() => {
    localStorage.setItem(
      "achievements",
      JSON.stringify(userAchievements)
    );
  }, [userAchievements]);

  // 🔄 flip
  const onToggle = (id: number) => {
    setFlipped((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div>
      <PetalsCanvas />

      <div className={css.headerWrapper}>
        <div className={css.textWrapper}>
          <h2 className={css.title}>Твої досягнення</h2>
          <p className={css.text}>
            Продовжуй тренуватись, щоб відкривати нові значки, та зірки
          </p>
        </div>

        <img
          src={"/image/achievement/astronaut-trophy.png"}
          className={css.img}
        />
      </div>

      <div className={css.achieve}>
        {achievements.map((item) => {
          const userData = userAchievements[item.id];

          const isUnlocked = userData === true;
          const progress =
            typeof userData === "number" ? userData : 0;

          const percent =
            item.type === "progress"
              ? Math.min((progress / item.max) * 100, 100)
              : isUnlocked
              ? 100
              : 0;

          return (
            <div key={item.id} className={css.card}>
              <div
                className={`${css.cardInner} ${
                  flipped.includes(item.id) ? css.flipped : ""
                }`}
                onClick={() => onToggle(item.id)}
              >
                {/* FRONT */}
                <div className={css.cardFront}>
                  <img
                    src={item.icon}
                    className={css.icon}
                    style={{
                      filter: isUnlocked
                        ? "none"
                        : "grayscale(100%) opacity(0.5)",
                    }}
                  />
                </div>

                {/* BACK */}
                <div className={css.cardBack}>
                  <p className={css.cardText}>{item.text}</p>

                  <div className={css.progressBar}>
                    <div
                      className={css.progress}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievement;