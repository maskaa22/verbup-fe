import clsx from "clsx"
import css from "./NotificationCheckBox.module.css"
const NotificationCheckBox = () => {
    return <div className={css.checkbox}>
        
        <label className={css.switch}>
            <input type='checkbox'/>
            <span className={clsx(css.slider, css.round) }></span>
        </label>
    </div>
}

export default NotificationCheckBox