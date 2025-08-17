import clsx from "clsx";
import css from "./WeekCal.module.css"
const shortDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];


const WeekCal = () => {
    const today = new Date()
    const weekDates: Date[] = [];
    const todayDate = today.getDate()
    const day = today.getDay() === 0 ? 7 : today.getDay()
    for(let i = 0; i < 7; i++){
    const date = new Date(today);
   
        date.setDate(today.getDate() - day + 1 + i);
        weekDates.push(date);
    }

    const currentDay = (i: number) => {
        console.log(weekDates[i].getDate() === todayDate)
return clsx(weekDates[i].getDate() === todayDate && css.todayWrap)
    }
    
    return <ul className={css.weekList}>
    {shortDays.map((day, i) => <li className={currentDay(i)} key={i}>
        <p>{day}</p>
        <p>{weekDates[i].getDate()}</p>
    </li>)}
</ul>

}

export default WeekCal;