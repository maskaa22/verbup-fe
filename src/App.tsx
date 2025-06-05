import { Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/game/Game";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/navBar/NavBar";
import Intro from "./pages/intro/Intro";
import Dictionary from "./pages/dictionary/Dictionary"

function App() {
  return (
    <>
      <Intro />
      <NavBar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/game" element={<Game />} />
        <Route path="/cup" element={<h1>Cup</h1>} />
        <Route path="/voc" element={<Dictionary/>} />
        <Route path="/set" element={<h1>Set</h1>} />
        <Route path="/share" element={<h1>Share</h1>} />
      </Routes>
    </>
  );
}

export default App;
