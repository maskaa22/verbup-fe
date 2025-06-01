import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signUp/SignUp";
import NavBar from "./components/NavBar/NavBar";
import Intro from "./pages/intro/Intro";

function App() {
  return <>
  <Intro/>
  <NavBar/>
  <Routes>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/game" element={<h1>Game</h1>}/>
    <Route path="/cup" element={<h1>Cup</h1>}/>
    <Route path="/voc" element={<h1>Voc</h1>}/>
    <Route path="/set" element={<h1>Set</h1>}/>
    <Route path="/share" element={<h1>Share</h1>}/>
  </Routes>
  </>;
}

export default App;
