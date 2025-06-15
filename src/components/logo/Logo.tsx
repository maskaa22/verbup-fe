import { useSelector } from "react-redux";
import css from "./Logo.module.css"
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Logo = () => {
    const isloggedIn = useSelector(selectIsLoggedIn)
return <div className={css.wrap}>
    <h4>Verb<span>Up!</span></h4>
    <p>Вивчай легко з нами</p>
    {isloggedIn ? <p>user is logged in</p> : <p>not logged in</p> }
</div>
};
export default Logo;