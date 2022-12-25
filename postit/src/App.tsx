import { Dispatch } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import DeletePost from "./pages/DeletePost";
import { fetchLoginStatus } from "./store/user/actions";
import Home from "./pages/Home";
import MyPost from "./pages/MyPost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { useDispatch } from "react-redux";
import TagPost from "./pages/TagPosts";
import Tags from "./pages/Tags";

function App() {
  const dispatch: Dispatch<any> = useDispatch();
  dispatch(fetchLoginStatus());
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/mypost" element={<MyPost />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts/tags/:id" element={<TagPost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deletepost" element={<DeletePost />} />
          <Route path="/editpost" element={<EditPost />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
