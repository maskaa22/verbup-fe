import css from "./ChangeUserData.module.css"
import { useState } from "react"
import FormForm from "../../components/formForm/FormForm"
const ChangeUserData = () => {
    const [isSubmited, setIsSubmited] = useState(false)
    const arrOfNames = [{
        label: "Поточний пароль",
        name: "current",
        type: "password",
        placeholder: "Мінімум 8 символів",
        icon: ["icon-password"]
    },
    {
        label: "Новий пароль",
        name: "new",
        type: "password",
        placeholder: "Мінімум 8 символів",
        icon: ["icon-password"]
    },
    {
        label: "Підтвердити новий пароль",
        name: "repeat",
        type: "password",
        placeholder: "Мінімум 8 символів",
        icon: ["icon-password"]
    }]

    const props = {
        arrOfNames,
        onSubmit: setIsSubmited
    }
    return isSubmited ? <div>
        <h2 className={css.title}>Пароль успішно змінено!</h2>
        <img src="/image/cute-astronaut-with-flag-min.png" alt="successfully submitted the form and the astronaut with flag is greating you" />
    </div> : <div>
    <h2 className={css.title}>Зміна паролю</h2>
    <FormForm {...props}/>
</div>
}

export default ChangeUserData;