import css from "./DicSearchBox.module.css"
const DicSearchBox = () => {

    return <div className={css.wrap}>
      <img src="/image/cute-astronaut-with-laptop-min.png" alt="cute astronaut with laptop sitting on the search box" />
        <div className={css.inputwrap}>
      <input
        className={css.input}
        id="search"
        type="text"
        placeholder="Пошук..." 
        autoComplete="off"
      />
    </div>
    </div>
}

export default DicSearchBox;