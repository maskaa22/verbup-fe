import { useState } from "react";
import css from "./DictABCFilter.module.css"
import clsx from "clsx";
const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const DictABCFilter = () => {
    const [active, setActive] = useState("");
return <div>
    <ul className={css.list}>
        {alphabet.map((letter, idx) => <li className={clsx(css.li, active === letter && css.actv)} onClick={() => setActive(letter)} key={idx}>{letter}</li> )}
    </ul>
</div>
}
export default DictABCFilter;