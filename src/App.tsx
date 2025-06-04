import { Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./pages/game/Game";

function App() {
  return (
    <>
      <Routes>
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
