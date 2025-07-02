import css from "./ChangeUserData.module.css"
import { useState } from "react"
import FormForm from "../../components/formForm/FormForm"

interface Props {
  userData: string;
}

const ChangeUserData: React.FC<Props> = ({userData}) => {
    const [isSubmited, setIsSubmited] = useState(false)
    const arrOfNamesPassword = [{
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

    const arrOfNamesUser = [
        {
        label: "Поточне ім’я",
        name: "current",
        type: "text",
        placeholder: "Введіть ваше ім'я",
        icon: ["icon-user"]
    },
    {
        label: "Нове ім’я",
        name: "new",
        type: "text",
         placeholder: "Введіть ваше ім'я",
        icon: ["icon-user"]
    },
    ]

    const props = {
        arrOfNames: userData === "password"? arrOfNamesPassword : arrOfNamesUser,
        onSubmit: setIsSubmited
    }
    return isSubmited ? <div>
        <h2 className={css.title}>{`${"Пароль"} успішно змінено!`}</h2>
        <img src="/image/cute-astronaut-with-flag-min.png" alt="successfully submitted the form and the astronaut with flag is greating you" />
    </div> : <div>
    <h2 className={css.title}>Зміна паролю</h2>
    <FormForm {...props}/>
</div>
}

export default ChangeUserData;