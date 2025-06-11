import css from "./DicSearchBox.module.css"
const DicSearchBox = () => {

    return <div className={css.wrap}>
        <div className={css.inputwrap}>
      <input
        className={css.input}
        id="search"
        type="text"
        placeholder="Пошук" 
        autoComplete="off"
      />
    </div>
    </div>
}

export default DicSearchBox;