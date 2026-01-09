import css from "./SpaceLoader.module.css";

const SpaceLoader = () => {
  return (
    <div className={css.wrap}>
      <div className={css.track}>
        <img
          className={css.spaceship}
          src="/image/space-ship-min.png"
          alt="space-ship"
        />
        {/* <img className={css.spaceship} src="/image/success.png" alt="space-ship" /> */}
      </div>
      <img className={css.planet} src="/image/Venus-min.png" alt="venus" />
    </div>
  );
};

export default SpaceLoader;
