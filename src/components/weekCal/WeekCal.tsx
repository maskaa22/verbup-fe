import css from "./WeekCal.module.css"
const shortDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];


const WeekCal = () => {
    const today = new Date()
    const weekDates: Date[] = [];
    for(let i = 0; i < 7; i++){
        const date = new Date(today);
        date.setDate(today.getDate() - today.getDay() + i);
        weekDates.push(date);
        
    }
    
    console.log(weekDates.map(d => d.getDate()))
    return <div>
<ul className={css.weekList}>
    {shortDays.map((day, i) => <li key={i}>
        <p>{day}</p>
        <p>{weekDates[i].getDate()}</p>
    </li>)}
</ul>
    </div>
}

export default WeekCal;