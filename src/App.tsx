import { Route, Routes } from "react-router-dom";
import "./App.css";
// import Game from "./pages/game/Game";
// import SignUp from "./pages/signUp/SignUp";
// import Intro from "./pages/intro/Intro";
// import Dictionary from "./pages/dictionary/Dictionary";
// import SignIn from "./pages/signIn/SignIn";
// import Home from "./pages/home/Home";
// import AuthLayout from "./components/authLayout/AuthLayout";
import RestrictedRoute from "./components/RestrictedRoute";
// import WordGame from "./components/wordGame/WordGame";
// import WriteGame from "./components/writeGame/WriteGame";
// import ResultGame from "./pages/resultGame/ResultGame";
import { lazy, useEffect, useState } from "react";
// import GameSetting from "./pages/gameSetting/GameSetting";
// import Setting from "./pages/setting/Setting";
// import ChangeUserData from "./pages/changeUserData/ChangeUserData";
// import NotificationParams from "./pages/notificationParams/NotificationParams";
// import ThemeSwitcher from "./pages/themeSwitcher/ThemeSwitcher";
// import Loader from "./components/loader/Loader";
// import LoaderDinamic from "./components/loaderDinamic/LoaderDinamic";
import usePageTracking from "./utils/googleAnalize";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./redux/store";
import { refreshUser } from "./redux/auth/operations";


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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 2.5s splash
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  usePageTracking();

  return (
    <>
      {" "}
      {loading ? (
        <LoaderDinamic />
      ) : (
        <Routes>
          <Route path="/" element={<Intro />} />

          <Route element={<AuthLayout />}>
            <Route
              path="/signup"
              element={
                <RestrictedRoute component={<SignUp />} redirectTo="/home" />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute component={<SignIn />} redirectTo="/home" />
              }
            />
            <Route path="/game" element={<Game />}>
              <Route path="write-word" element={<WriteGame />} />
              <Route path="check-word" element={<WordGame />} />
              <Route path="result" element={<ResultGame />} />
            </Route>
            <Route path="/home" element={<Home />} />
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
        </Routes>
      )}
    </>
  );
}

export default App;
