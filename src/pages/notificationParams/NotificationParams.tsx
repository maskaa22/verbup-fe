import { useDispatch } from "react-redux";
import NotificationCheckBox from "../../components/notificatioCheckBox/NotificationCheckBox";
import css from "./NotificationParams.module.css"
import { useEffect, useState } from "react";
import { setAllNotifications } from "../../redux/notify/slice";
const NotificationParams = () => {
    const dispatch = useDispatch()

interface Notifications {
        dailyTraining: boolean,
    achievsAndLevels: boolean,
    specialOffers: boolean,
    motivateMe: boolean,
    sound: boolean,
    darkTheme: boolean
}

type NotificationKey = keyof Notifications;

const [notifications, setNotifications] = useState<Notifications>({
    dailyTraining: false,
    achievsAndLevels: false,
    specialOffers: false,
    motivateMe: false,
    sound: false,
    darkTheme: false})

    const handleChange = (name: NotificationKey) => {
  setNotifications((prev) => ({
    ...prev,
    [name]: !prev[name],
  }));
};


useEffect(() => {dispatch(setAllNotifications(notifications))}, [notifications])
return <div className={css.wrap}>
<h2 className={css.title}>Параметри сповіщень</h2>
<ul className={css.allnotifi}>
<li>
    <div>
    <p className={css.mainText}>Щоденне тренування </p>
    <p className={css.addText}>Нагадування тренувати дієслова щодня</p>
    </div>
    <NotificationCheckBox checked={notifications.dailyTraining}  onChange={() => handleChange("dailyTraining")}/>
</li>
<li>
    <div>
    <p className={css.mainText}>Досягнення й рівні </p>
    <p className={css.addText}>Повідомлення про нові рівні або бали</p>
    </div>
    <NotificationCheckBox checked={notifications.achievsAndLevels}  onChange={() => handleChange("achievsAndLevels")}/>
</li>
<li>
    <div>
    <p className={css.mainText}>Спеціальні пропозиції </p>
    <p className={css.addText}>Наприклад, акції, оновлення</p>
    </div>
    <NotificationCheckBox checked={notifications.specialOffers}  onChange={() => handleChange("specialOffers")}/>
</li>
<li>
    <p className={css.mainText}>Мотиваційні повідомнення </p>
    <NotificationCheckBox checked={notifications.motivateMe}  onChange={() => handleChange("motivateMe")}/>
</li>
<li>
    <p className={css.mainText}>Озвучування дієслів </p>
    <NotificationCheckBox checked={notifications.sound}  onChange={() => handleChange("sound")}/>
</li>
</ul>
</div>
}

export default NotificationParams;