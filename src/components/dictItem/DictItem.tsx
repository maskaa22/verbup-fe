import { useEffect, useState } from "react";
import type { Props } from "../../utils/dict/dictTypes";
import css from "./DictItem.module.css";
import clsx from "clsx";
import { speakWordsIndividually } from "../../utils/dict/dictSound";
import { useDispatch, useSelector } from "react-redux";
import {
  selectppProgress,
  selectpsProgress,
} from "../../redux/progress/selectors";
import { stopSpeech } from "../../utils/dict/speechController";
import { selectFavorites } from "../../redux/dict/selectors";
import { toggleFavorite } from "../../redux/dict/slice";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const DictItem: React.FC<Props> = ({
  word: { basic, pastSimple, pastParticiple, uk },
}) => {
  const psProgress = useSelector(selectpsProgress);
  const ppProgress = useSelector(selectppProgress);
  const favorites = useSelector(selectFavorites);
  const loggedin = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const psLearnt = psProgress.find((word) => word.word?.basic === basic);
  const ppLearnt = ppProgress.find((word) => word.word?.basic === basic);

  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSound = async () => {
    if (isSpeaking) return;

    const wordList = [basic, pastSimple, pastParticiple];

    setIsSpeaking(true);

    await speakWordsIndividually(wordList, 1000);

    setIsSpeaking(false);
  };
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const isFavorite = favorites.includes(basic);

  const handleFavorite = () => {
    dispatch(toggleFavorite(basic));
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.wordWrap}>
      <div className={css.bsWrap}>
        <div className={css.dotWrap}>
          <span className={css.dot}></span>
          <div className={css.baseForm}>
            <p>{basic}</p>
            <p>{uk}</p>
          </div>
        </div>

        <div className={css.iconsWrapper}>
          <div onClick={() => handleSound()} className={css.soundBtn}>
            <svg className={clsx(css.sound, isSpeaking && css.speaking)}>
              <use href="./icons.svg#icon-sound"></use>
            </svg>
          </div>

          {loggedin && (
            <div className={css.heardWrapper} onClick={handleFavorite}>
              <svg
                className={`${css.iconHeard} ${isFavorite && css.favorite} `}
              >
                <path
                  d="M10 6.6665C10 6.6665 10 6.6665 9.36667 5.83317C8.63333 4.8665 7.55 4.1665 6.25 4.1665C4.175 4.1665 2.5 5.8415 2.5 7.9165C2.5 8.6915 2.73333 9.40817 3.13333 9.99984C3.80833 11.0082 10 17.4998 10 17.4998M10 6.6665C10 6.6665 10 6.6665 10.6333 5.83317C11.3667 4.8665 12.45 4.1665 13.75 4.1665C15.825 4.1665 17.5 5.8415 17.5 7.9165C17.5 8.6915 17.2667 9.40817 16.8667 9.99984C16.1917 11.0082 10 17.4998 10 17.4998"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          <div onClick={() => handleToggle()} className={css.openBtn}>
            <svg
              className={css.arrow}
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.3s",
              }}
            >
              <use href="./icons.svg#icon-accordion-arrow"></use>
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={css.irrForm}>
          <div className={css.dotWrap}>
            <span className={`${css.dot} ${psLearnt && css.learnt}`}></span>
            <p onClick={() => speakWordsIndividually([pastSimple], 1500)}>
              {pastSimple}
            </p>
          </div>
          <div className={css.dotWrap}>
            <span className={`${css.dot} ${ppLearnt && css.learnt}`}></span>
            <p onClick={() => speakWordsIndividually([pastParticiple], 1500)}>
              {pastParticiple}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictItem;
