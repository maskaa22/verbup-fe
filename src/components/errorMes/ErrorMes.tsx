import { useSelector } from "react-redux";
import { selectIsError } from "../../redux/auth/selectors";


const ErrorMes = () => {
  const error = useSelector(selectIsError)
  const message = error?.status
  return <>
  {message && <h3>Something went wrong, try again!</h3> }
  {(message === 404 || message === 400) && <h3>Ви ввели невірні данні, спробуйте ще раз</h3> }
  {(message === 401 || message === 403) && <h3>Ваш аккаунт не авторизований. Перевірте свій імеїл для авторизації.</h3> }
  {message === 500 && <h3>Сталась помилка на сервері, будь ласка спробуйте пізніше</h3> }
      </>
};

export default ErrorMes;
