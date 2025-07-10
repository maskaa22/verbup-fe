import { useSelector } from "react-redux";
import css from "./Logo.module.css"
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Logo = () => {
    const isloggedIn = useSelector(selectIsLoggedIn)
return <div className={css.wrap}>
    <img src="/image/Logo-full-min.png" alt="planet above words verb up!" />
    {/* <h4>Verb<span>Up!</span></h4> */}
    {isloggedIn ? <p>user is logged in</p> : <p>not logged in</p> }
</div>
};
export default Logo;