import css from "./StarBackground.module.css";

const stars = Array.from({ length: 11 });

const StarBackground = () => {
  return (
    <div className={css.background}>
      {stars.map((_, index) => (
        <svg
          width="22"
          height="30"
          viewBox="0 0 22 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={index}
          className={`${css.star} ${css[`star${index}`]}`}
        >
          <path
            d="M6.47464 5.2239e-05L12.6955 9.75494L21.8936 11.2529L15.1113 17.6442L15.4189 29.2098L9.19801 19.4549L-4.04164e-05 17.9569L6.78225 11.5656L6.47464 5.2239e-05Z"
            fill="#5E909E"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarBackground;
