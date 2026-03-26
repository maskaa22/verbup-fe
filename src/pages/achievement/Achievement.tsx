import css from "./Achievement.module.css";

const achievements = [
  {
    id: 1,
    icon: "/image/achievement/achivement.png",
    text: "Перше тренування завершено — ти стартував(ла)!",
  },
  {
    id: 2,
    icon: "/image/achievement/rocket.png",
    text: "Перші 5 вивчених дієслів — гарний початок!",
  },
  {
    id: 3,
    icon: "/image/achievement/money.png",
    text: `Досягнуто рівня "Beginner"`,
  },
  {
    id: 4,
    icon: "/image/achievement/megaphone.png",
    text: "Поширив для друга",
  },
  {
    id: 5,
    icon: "/image/achievement/stopwatch.png",
    text: "5 годин активного тренування",
  },
  {
    id: 6,
    icon: "/image/achievement/cloude.png",
    text: "Зареєстрований акаунт — тепер усе зберігається!",
  },
  {
    id: 7,
    icon: "/image/achievement/trophy.png",
    text: "Досягнення “VerbMaster” — відкривається, коли вивчені всі форми всіх дієслів",
  },
  {
    id: 8,
    icon: "/image/achievement/dart.png",
    text: "Пройдено тренування без жодної помилки",
  },
  {
    id: 9,
    icon: "/image/achievement/settings.png",
    text: `Досягнуто рівня "Intermediate"`,
  },
  {
    id: 10,
    icon: "/image/achievement/fire.png",
    text: "100 дієслів у твоєму активному запасі",
  },
  {
    id: 11,
    icon: "/image/achievement/calendar.png",
    text: "30 днів підряд активності (Legend!)",
  },
  {
    id: 12,
    icon: "/image/achievement/laptop.png",
    text: "3 тренування поспіль без помилок",
  },
  {
    id: 13,
    icon: "/image/achievement/pie-chart.png",
    text: "Пройдено тренування без жодної помилки",
  },
];

const Achievement: React.FC = () => {
  return (
    <div>
      <div className={css.headerWrapper}>
        <div className={css.textWrapper}>
          <h2 className={css.title}>Твої досягнення</h2>
          <p className={css.text}>
            Продовжуй тренуватись, щоб відкривати нові значки, та зірки{" "}
          </p>
        </div>

        <img
          src={"/image/achievement/astronaut-trophy.png"}
          className={css.img}
        />
      </div>

      <div className={css.achieve}>
        {achievements.map((item) => (
          <div key={item.id} className={css.card}>
            <div className={css.cardInner} onClick={() => ontoggle}>
              {/* FRONT */}
              <div className={css.cardFront}>
                <img src={item.icon} className={css.icon} />
              </div>

              {/* BACK */}
              <div className={css.cardBack}>
                <p className={css.cardText}>{item.text}</p>

                <div className={css.progressBar}>
                  <div className={css.progress}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievement;
