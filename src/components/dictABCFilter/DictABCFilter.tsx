import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import css from "./DictABCFilter.module.css"
import clsx from "clsx";
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const DictABCFilter = () => {
    const [active, setActive] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActive(""); // Hide dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
return <div ref={dropdownRef}>
    <Swiper spaceBetween={10} className={css.list}>
        {alphabet.map((letter, idx) => <SwiperSlide className={clsx(css.li, active === letter && css.actv)} onClick={() => setActive(letter)}  key={idx}>
            <div>{letter}</div>
        </SwiperSlide> )}
    </Swiper>
</div>
}
export default DictABCFilter;

