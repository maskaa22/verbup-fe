import VERBS from "../../data/irr-verbs.json";
import css from "./DickTable.module.css"


const DickTable = () => {
    const verbs = VERBS.easy;
return <div>
    <table className={css.table}>
  {/* <thead>
    <tr>
      <th>Base Form</th>
      <th>Past Simple</th>
      <th>Past Participle</th>
    </tr>
  </thead> */}
  <tbody>
    {verbs.map((verb, idx) => (
      <tr key={idx}>
        <td><svg className={css.icon}><use href="./icons.svg#icon-voc"></use></svg></td>
        <td>{verb.base_form}</td>
        <td>{verb.past_simple}</td>
        <td>{verb.past_participle}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>
};
export default DickTable;

