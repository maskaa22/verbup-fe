import { Route, Routes } from "react-router-dom";
import "./App.css";
import RestrictedRoute from "./components/RestrictedRoute";
import { lazy, useEffect, useState } from "react";
import usePageTracking from "./utils/googleAnalize";
import SpaceLoader from "./components/spaceLoader/SpaceLoader";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { refreshUser } from "./redux/auth/operations";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./redux/auth/selectors";


const Intro = lazy(() => import("./pages/intro/Intro"));
const SignIn = lazy(() => import("./pages/signIn/SignIn"));
const SignUp = lazy(() => import("./pages/signUp/SignUp"));
const Home = lazy(() => import("./pages/home/Home"));
const AuthLayout = lazy(() => import("./components/authLayout/AuthLayout"));
const GameSetting = lazy(() => import("./pages/gameSetting/GameSetting"));
const Setting = lazy(() => import("./pages/setting/Setting"));
const ChangeUserData = lazy(() => import("./pages/changeUserData/ChangeUserData"));
const NotificationParams = lazy(() => import("./pages/notificationParams/NotificationParams"));
const ThemeSwitcher = lazy(() => import("./pages/themeSwitcher/ThemeSwitcher"));
const Dictionary = lazy(() => import("./pages/dictionary/Dictionary"));
const Game = lazy(() => import("./pages/game/Game"));
const WordGame = lazy(() => import("./components/wordGame/WordGame"));
const WriteGame = lazy(() => import("./components/writeGame/WriteGame"));
const ResultGame = lazy(() => import("./pages/resultGame/ResultGame"));
const LoaderDinamic = lazy(() => import("./components/loaderDinamic/LoaderDinamic"));

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedin = useSelector(selectIsLoggedIn)
  

  useEffect(() => {console.log(isLoggedin)}, [isLoggedin])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false) , 3000); // 2.5s splash
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // if(loading) return;
    if(isLoggedin){dispatch(refreshUser());}

  }, [dispatch]);

  usePageTracking();

  return (
    <>
      {" "}
      {loading ? (
        <SpaceLoader/>
      ) : (
        <Routes>
          <Route path="/" element={<Intro />} />

          <Route element={<AuthLayout />}>
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route
              path="/signin"
              element={<SignIn />}
            />
            <Route path="/game" element={<Game />}>
              <Route path="write-word" element={<WriteGame />} />
              <Route path="check-word" element={<WordGame />} />
              <Route path="result" element={<ResultGame />} />
            </Route>
            <Route path="/home" element={<RestrictedRoute component={<Home />} redirectTo="/signin" />} />
            <Route path="/cup" element={<LoaderDinamic />} />
            <Route path="/voc" element={<Dictionary />} />
            <Route path="/setting" element={<Setting />}></Route>
            <Route path="/setting/game" element={<GameSetting />} />
            <Route path="/share" element={<h1>Share</h1>} />
            <Route
              path="/setting/change-password"
              element={<ChangeUserData userData="password" />}
            />
            <Route
              path="/setting/change-username"
              element={<ChangeUserData userData="username" />}
            />
            <Route
              path="/setting/notification-params"
              element={<NotificationParams />}
            />
            <Route path="/setting/theme-switcher" element={<ThemeSwitcher />} />
          </Route>
          <Route path="/loader" element={<SpaceLoader/>}/>
        </Routes>
      )}
    </>
  );
}

export default App;
