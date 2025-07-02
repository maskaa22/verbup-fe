import NotificationCheckBox from "../../components/notificatioCheckBox/NotificationCheckBox";
import css from "./NotificationParams.module.css"
const NotificationParams = () => {
return <div className={css.wrap}>
<h2 className={css.title}>Параметри сповіщень</h2>
<ul className={css.allnotifi}>
<li>
    <div>
    <p className={css.mainText}>Щоденне тренування </p>
    <p className={css.addText}>Нагадування тренувати дієслова щодня</p>
    </div>
    <NotificationCheckBox/>
</li>
<li>
    <div>
    <p className={css.mainText}>Досягнення й рівні </p>
    <p className={css.addText}>Повідомлення про нові рівні або бали</p>
    </div>
    <NotificationCheckBox/>
</li>
<li>
    <div>
    <p className={css.mainText}>Спеціальні пропозиції </p>
    <p className={css.addText}>Наприклад, акції, оновлення</p>
    </div>
    <NotificationCheckBox/>
</li>
<li>
    <p className={css.mainText}>Мотиваційні повідомнення </p>
    <NotificationCheckBox/>
</li>
<li>
    <p className={css.mainText}>Озвучування дієслів </p>
    <NotificationCheckBox/>
</li>
</ul>
</div>
}

export default NotificationParams;