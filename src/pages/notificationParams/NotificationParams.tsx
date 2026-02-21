import { useDispatch } from "react-redux";
import NotificationCheckBox from "../../components/notificatioCheckBox/NotificationCheckBox";
import css from "./NotificationParams.module.css";
import { setAllNotifications, setVoice } from "../../redux/notify/slice";
import { useSelector } from "react-redux";
import { selectAllNotifications } from "../../redux/notify/selectors";
import type { Notifications } from "../../utils/notify/notifyTypes";
import { VIBRATION } from "../../constants";
import RadioButton from "../../components/radioButton/RadioButton";
import { speakText } from "../../utils/voiseFunction";
import type { VoiceKey } from "../../utils/gameType";
import { useMobileOS } from "../../hooks/useMobileOS";

const NotificationParams = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);

  const os = useMobileOS();

  type NotificationKey = keyof Notifications;

  const handleChange = (name: NotificationKey) => {
    dispatch(
      setAllNotifications({
        ...notifications,
        [name]: !notifications[name],
      }),
    );
  };

  const handleVoiceChange = (value: VoiceKey) => {
    speakText("Hello!", value, os);
    dispatch(setVoice(value));
  };

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Параметри сповіщень</h2>
      <ul className={css.allnotifi}>
        {/* <li>
          <div>
            <p className={css.mainText}>Щоденне тренування </p>
            <p className={css.addText}>Нагадування тренувати дієслова щодня</p>
          </div>
          <NotificationCheckBox
            checked={notifications.dailyTraining}
            onChange={() => handleChange("dailyTraining")}
          />
        </li>
        <li>
          <div>
            <p className={css.mainText}>Досягнення й рівні </p>
            <p className={css.addText}>Повідомлення про нові рівні або бали</p>
          </div>
          <NotificationCheckBox
            checked={notifications.achievsAndLevels}
            onChange={() => handleChange("achievsAndLevels")}
          />
        </li>
        <li>
          <div>
            <p className={css.mainText}>Спеціальні пропозиції </p>
            <p className={css.addText}>Наприклад, акції, оновлення</p>
          </div>
          <NotificationCheckBox
            checked={notifications.specialOffers}
            onChange={() => handleChange("specialOffers")}
          />
        </li> */}
        <li>
          <p className={css.mainText}>Мотиваційні повідомнення </p>
          <NotificationCheckBox
            checked={notifications.motivateMe}
            onChange={() => handleChange("motivateMe")}
          />
        </li>
        <li>
          <div>
            <p className={css.mainText}>Озвучування дієслів</p>
            {notifications.sound && (
              <div className={css.voiceGroup}>
                <RadioButton
                  name="voice"
                  value="1"
                  label="Голос 1"
                  checked={notifications.voice === "1"}
                  onChange={handleVoiceChange}
                />
                <RadioButton
                  name="voice"
                  value="2"
                  label="Голос 2"
                  checked={notifications.voice === "2"}
                  onChange={handleVoiceChange}
                />
                <RadioButton
                  name="voice"
                  value="3"
                  label="Голос 3"
                  checked={notifications.voice === "3"}
                  onChange={handleVoiceChange}
                />
              </div>
            )}
          </div>
          <NotificationCheckBox
            checked={notifications.sound}
            onChange={() => handleChange("sound")}
          />
        </li>
        <li>
          <p className={css.mainText}>Звукові ефекти в результатах</p>
          <NotificationCheckBox
            checked={notifications.soundEffects}
            onChange={() => handleChange("soundEffects")}
          />
        </li>
        <li>
          <p className={css.mainText}>Вібрація </p>
          <NotificationCheckBox
            checked={notifications.vibration}
            onChange={() => handleChange(VIBRATION)}
          />
        </li>
      </ul>
    </div>
  );
};

export default NotificationParams;
