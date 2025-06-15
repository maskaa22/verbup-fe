import VERBS from "../../data/irr-verbs.json";
import css from "./DictTable.module.css"
import clsx from "clsx"

const progress = {
    "data": {
        "progressPs": [
            {
                "id": 1,
                "status": "studied",
                "createdAt": "2025-06-03T13:31:36.705Z",
                "updatedAt": "2025-06-03T13:31:36.705Z",
                "word": {
                    "basic": "go"
                }
            },
            {
                "id": 2,
                "status": "studied",
                "createdAt": "2025-06-03T13:31:36.705Z",
                "updatedAt": "2025-06-03T13:31:36.705Z",
                "word": {
                    "basic": "do"
                }
            },
            {
                "id": 7,
                "status": "mistake",
                "createdAt": "2025-06-08T14:07:46.330Z",
                "updatedAt": "2025-06-08T14:07:46.330Z",
                "word": {
                    "basic": "eat"
                }
            },
            {
                "id": 9,
                "status": "studied",
                "createdAt": "2025-06-08T14:07:46.330Z",
                "updatedAt": "2025-06-08T14:07:46.330Z",
                "word": {
                    "basic": "become"
                }
            }
        ],
        "progressPp": []
    }
}
const psmistakes = progress.data.progressPs.filter(el => el.status === "mistake").map(el => el.word.basic)
const psstudied = progress.data.progressPs.filter(el => el.status === "studied").map(el => el.word.basic)
// console.log(psstudied)
const highlightClass = (item: string, mistake: string[], studied: string[]) => {
  // console.log(item);
  // console.log(highlights.includes(item))
return clsx(`${mistake.includes(item) ? css.red : studied.includes(item) ? css.green : css.base}`)
}
const DickTable = () => {
    const verbs = VERBS.easy;
return <div>
    <table className={css.table}>
  <tbody>
    {verbs.map((verb, idx) => (
      <tr key={idx}>
        <td><svg className={css.icon}><use href="./icons.svg#icon-voc"></use></svg></td>
        <td>{verb.base_form}</td>
        <td className={highlightClass(verb.base_form, psmistakes, psstudied)}>{verb.past_simple}</td>
        <td>{verb.past_participle}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
};
export default DickTable;

