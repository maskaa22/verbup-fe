import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import css from "./DictABCFilter.module.css";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setLetter } from "../../redux/dict/slice";
// import { useSelector } from "react-redux";
// import { letterFilter } from "../../redux/dict/selectors";

//----------------------------------------ABC----------------------------------------------------
const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);

//--------------------------------------------------------------------------------------------------------
const DictABCFilter = () => {
  const [active, setActive] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();


  const handleDispatch = (letter: string) =>    letter === active ? dispatch(setLetter("")) : dispatch(setLetter(letter));   
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       dispatch(setLetter(""));
  //       setActive("");
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [dispatch]);
  return (
    <div className={css.wrap} ref={dropdownRef}>
      <Swiper loop={false} slidesPerView={9} className={css.list}>
        {alphabet.map((letter, idx) => (
          <SwiperSlide
            className={clsx(css.li, active === letter && css.actv)}
            onClick={() => letter === active ? setActive("") : setActive(letter)}
            key={idx}
          >
            <div className={css.letter} onClick={() => handleDispatch(letter)}>{letter}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default DictABCFilter;
