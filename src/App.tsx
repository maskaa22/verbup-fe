import { Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/game/Game";
import SignUp from "./pages/signUp/SignUp";
import Intro from "./pages/intro/Intro";
import Dictionary from "./pages/dictionary/Dictionary";
import SignIn from "./pages/signIn/SignIn";
import Home from "./pages/home/Home";
import AuthLayout from "./components/authLayout/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/game" element={<Game />} />
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cup" element={<h1>Cup</h1>} />
          <Route path="/voc" element={<Dictionary />} />
          <Route path="/set" element={<h1>Set</h1>} />
          <Route path="/share" element={<h1>Share</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
