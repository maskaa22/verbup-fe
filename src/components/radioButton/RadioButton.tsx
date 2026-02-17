import css from "./RadioButton.module.css";

type RadioButtonProps<T extends string> = {
  name: string;
  value: T;
  label: string;
  checked: boolean;
  onChange: (value: T) => void;
};

const RadioButton = <T extends string>({
  name,
  value,
  label,
  checked,
  onChange,
}: RadioButtonProps<T>) => {
  return (
    <label className={css.radioItem}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />

      <span className={css.iconWrapper}>
        {/* Зовнішнє коло */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 15.5312C12.1594 15.5312 15.5312 12.1594 15.5312 8C15.5312 3.84061 12.1594 0.46875 8 0.46875C3.84061 0.46875 0.46875 3.84061 0.46875 8C0.46875 12.1594 3.84061 15.5312 8 15.5312Z"
            fill="url(#paint0_linear_4942_4960)"
            fillOpacity="0.5"
          />
          <path
            d="M8 1.21875C12.0336 1.21875 15.3265 4.38984 15.5219 8.375C15.528 8.25075 15.5312 8.12575 15.5312 8C15.5312 3.84059 12.1594 0.46875 8 0.46875C3.84059 0.46875 0.46875 3.84059 0.46875 8C0.46875 8.12575 0.471969 8.25075 0.478063 8.375C0.6735 4.38984 3.96637 1.21875 8 1.21875Z"
            fill="#464A4C"
          />
          <path
            d="M8 11.6959C6.04078 11.6959 4.43553 10.1808 4.29178 8.2583C4.28478 8.35187 4.28127 8.44566 4.28125 8.53949C4.28125 10.5933 5.94619 12.2582 8 12.2582C10.0538 12.2582 11.7188 10.5933 11.7188 8.53949C11.7188 8.4449 11.7152 8.35111 11.7082 8.2583C11.5645 10.1807 9.95922 11.6959 8 11.6959Z"
            fill="#464A4C"
          />
          <path
            d="M8 11.7188C10.0538 11.7188 11.7188 10.0538 11.7188 8C11.7188 5.94619 10.0538 4.28125 8 4.28125C5.94619 4.28125 4.28125 5.94619 4.28125 8C4.28125 10.0538 5.94619 11.7188 8 11.7188Z"
            fill="#F4F3EF"
          />
          <path
            d="M5.71786 7.49835C5.6553 7.49835 5.59164 7.48754 5.52948 7.46472C5.24595 7.36066 5.10045 7.04644 5.20455 6.76291C5.48874 5.98857 6.19805 5.35172 7.10186 5.05941C7.3892 4.96644 7.69755 5.12407 7.79049 5.41147C7.88342 5.69888 7.7258 6.00716 7.43842 6.1001C6.74777 6.32344 6.36202 6.78363 6.2313 7.13975C6.15005 7.36113 5.9407 7.49835 5.71786 7.49835Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4942_4960"
              x1="8"
              y1="0.46875"
              x2="8"
              y2="15.5312"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E8E8E8" stopOpacity="0.3" />
              <stop offset="1" stopColor="#5E909E" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>

        {!checked && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css.innerCircle}
          >
            <path
              d="M3.71875 7.4375C5.77256 7.4375 7.4375 5.77256 7.4375 3.71875C7.4375 1.66494 5.77256 0 3.71875 0C1.66494 0 0 1.66494 0 3.71875C0 5.77256 1.66494 7.4375 3.71875 7.4375Z"
              fill="#F4F3EF"
            />
          </svg>
        )}

        {/* Внутрішня точка */}
        {checked && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={css.innerCircle}
          >
            <path
              d="M3.71875 7.4375C5.77256 7.4375 7.4375 5.77256 7.4375 3.71875C7.4375 1.66494 5.77256 0 3.71875 0C1.66494 0 0 1.66494 0 3.71875C0 5.77256 1.66494 7.4375 3.71875 7.4375Z"
              fill="#0D9467"
            />
          </svg>
        )}
      </span>

      <p>{label}</p>
    </label>
  );
};

export default RadioButton;
