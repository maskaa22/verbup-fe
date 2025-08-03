import clsx from "clsx"
import css from "./ValidPassword.module.css"

interface Props {
    isValid:
    {a: boolean, 
    A: boolean, 
    num: boolean, 
    sym: boolean}
}
const ValidPassword: React.FC<Props> = ({isValid: {a, A, num, sym}}) => {
return <div className={css.wrap}>
    <p className={css.title}>Пароль має містити:</p>
 <ul className={css.list}>
    <li className={clsx(a ? css.valid : css.invalid)}>
       малу літеру
    </li>
    <li className={clsx(A ? css.valid : css.invalid)}>
        велику літеру
    </li>
    <li className={clsx(num ? css.valid : css.invalid)}>
        цифру
    </li>
    <li className={clsx(sym ? css.valid : css.invalid)}>
        спецсимвол (!@#$%&*)
    </li>
</ul>
</div>
}

export default ValidPassword;