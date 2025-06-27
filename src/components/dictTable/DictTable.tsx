// import { useEffect, useState } from "react";
// import VERBS from "../../../public/data/irr-verbs.filtered.json";
import DictItem from "../dictItem/DictItem";

import css from "./DictTable.module.css"
import { useSelector } from "react-redux";
import { visibleWordsStore } from "../../redux/dict/selectors";
// import clsx from "clsx"

// const progress = {
//     "data": {
//         "progressPs": [
//             {
//                 "id": 1,
//                 "status": "studied",
//                 "createdAt": "2025-06-03T13:31:36.705Z",
//                 "updatedAt": "2025-06-03T13:31:36.705Z",
//                 "word": {
//                     "basic": "go"
//                 }
//             },
//             {
//                 "id": 2,
//                 "status": "studied",
//                 "createdAt": "2025-06-03T13:31:36.705Z",
//                 "updatedAt": "2025-06-03T13:31:36.705Z",
//                 "word": {
//                     "basic": "do"
//                 }
//             },
//             {
//                 "id": 7,
//                 "status": "mistake",
//                 "createdAt": "2025-06-08T14:07:46.330Z",
//                 "updatedAt": "2025-06-08T14:07:46.330Z",
//                 "word": {
//                     "basic": "eat"
//                 }
//             },
//             {
//                 "id": 9,
//                 "status": "studied",
//                 "createdAt": "2025-06-08T14:07:46.330Z",
//                 "updatedAt": "2025-06-08T14:07:46.330Z",
//                 "word": {
//                     "basic": "become"
//                 }
//             }
//         ],
//         "progressPp": []
//     }
// }
// const psmistakes = progress.data.progressPs.filter(el => el.status === "mistake").map(el => el.word.basic)
// const psstudied = progress.data.progressPs.filter(el => el.status === "studied").map(el => el.word.basic)

// const highlightClass = (item: string, mistake: string[], studied: string[]) => {

// return clsx(`${mistake.includes(item) ? css.red : studied.includes(item) ? css.green : css.base}`)
// }


const DickTable = () => {
const visibleVerbs = useSelector(visibleWordsStore);


if(!visibleVerbs){
    return "couldn't fetch the verbs";
}
if(visibleVerbs.length <= 0){
  return "There are no verbs on the letter"
}
// if(visibleVerbs.length === 1){
//     return <DictItem word={visibleVerbs[0]}/>
// }
const myVerbs = visibleVerbs;
return <div className={css.wrap}>
    <ul className={css.table}>

    {myVerbs.map((verb, idx) => (
        <li key={idx}>
     <DictItem word={verb}/>
      </li>
    ))}
</ul>
</div>
};
export default DickTable;

