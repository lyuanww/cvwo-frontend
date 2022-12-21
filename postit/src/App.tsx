import { Dispatch } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import { fetchLoginStatus } from "./store/user/actions";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";

function App() {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(fetchLoginStatus());
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
