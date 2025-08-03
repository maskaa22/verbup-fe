import css from "./ChangeUserData.module.css";
import FromChangePsw from "../../components/formChangePsw/FormChangePsw";

interface Props {
  userData: string;
}

const ChangeUserData: React.FC<Props> = ({ userData }) => {

  
  return     <div>
      <h2 className={css.title}>Зміна паролю</h2>
      {
        userData === "password" ? <FromChangePsw/> : "change name"
      }
    </div>

};

export default ChangeUserData;


{/* <div>
      <h2 className={css.title}>{`${"Пароль"} успішно змінено!`}</h2>
      <img
        src="/image/cute-astronaut-with-flag-min.png"
        alt="successfully submitted the form and the astronaut with flag is greating you"
      />
    </div> */}