import css from "./ChangeUserData.module.css";
import { useState } from "react";
import FormForm from "../../components/formForm/FormTemplate";
import { arrOfNamesPassword, arrOfNamesUser } from "../../constants";
import type { FormikHelpers } from "formik";
import type { ChangePasswordFormValues } from "../../utils/formTypes";

interface Props {
  userData: string;
}

const ChangeUserData: React.FC<Props> = ({ userData }) => {
  const [isSubmited, setIsSubmited] = useState(false);

  // const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (
    values: ChangePasswordFormValues,
    actions: FormikHelpers<ChangePasswordFormValues>
  ): void => {
    console.log(values);
    // dispatch(register(values));
    setIsSubmited(true);
    actions.resetForm();
  };
  const props = {
    arrOfNames: userData === "password" ? arrOfNamesPassword : arrOfNamesUser,
    onSubmit: handleSubmit,
  };
  return isSubmited ? (
    <div>
      <h2 className={css.title}>{`${"Пароль"} успішно змінено!`}</h2>
      <img
        src="/image/cute-astronaut-with-flag-min.png"
        alt="successfully submitted the form and the astronaut with flag is greating you"
      />
    </div>
  ) : (
    <div>
      <h2 className={css.title}>Зміна паролю</h2>
      <FormForm {...props} />
    </div>
  );
};

export default ChangeUserData;
