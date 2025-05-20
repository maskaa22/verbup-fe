import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signUp/SignUp";

function App() {
  return <>
  <Link to="/signup">Зареєструватись</Link>
  <Routes>
    <Route path="/signup" element={<SignUp/>}/>
  </Routes>
  </>;
}

export default App;
