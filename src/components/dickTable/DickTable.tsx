import VERBS from "../../data/irr-verbs.json";


const DickTable = () => {
    const verbs = VERBS.easy;
return <div>
    <table>
  <thead>
    <tr>
      <th>Base Form</th>
      <th>Past Simple</th>
      <th>Past Participle</th>
    </tr>
  </thead>
  <tbody>
    {verbs.map((verb, idx) => (
      <tr key={idx}>
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