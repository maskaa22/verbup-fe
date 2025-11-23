// import css from "./SignOut.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { logout, resetAll } from "../../redux/auth/operations";
import BaseButtonStart from "../baseButtonStart/BaseButtonStart";
import { useNavigate } from "react-router-dom";

const SignOut = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate= useNavigate()
  const handleSignOut = async () => {
    const res = await dispatch(logout());
    if (logout.fulfilled.match(res)) {
      dispatch(resetAll());
      navigate("/game")
      onClose();
    }
  };
  return (
    <>
      <h3>Are you sure you want to leave?</h3>
      {/* <button
                  onClick={() => {
                    dispatch(logout());
                    dispatch(resetAll());
                  }}
                  className={css.button}
                >
                  Вийти з акаунту
                </button> */}
      <BaseButtonStart label="Вийти з акаунту" onClick={handleSignOut} />
    </>
  );
};

export default SignOut;
