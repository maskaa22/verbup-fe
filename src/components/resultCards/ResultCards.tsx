import css from "./ResultCards.module.css"
interface ResultCardsProps {
    value: number,
    icon: string,
    text: string
}

const ResultCards: React.FC<ResultCardsProps> = ({value = 0, icon, text}) => {
   return <li className={css.item}>
                <svg className={css.icon}>
                  <use href={`/icons.svg#${icon}`}></use>
                </svg>
                <p>{value}</p>
                <p className={css.text}>{text}</p>
              </li>

}

export default ResultCards;