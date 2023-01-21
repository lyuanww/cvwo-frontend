import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { fetchCurrentSessionAsync } from "./store/session/sessionSlice";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import DeletePost from "./pages/DeletePost";
import Home from "./pages/Home";
import MyPost from "./pages/MyPost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import TagPost from "./pages/TagPosts";
import Tags from "./pages/Tags";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentSessionAsync());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/myposts" element={<MyPost />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts/tags/:id" element={<TagPost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/deletepost" element={<DeletePost />} />
          <Route path="/editpost" element={<EditPost />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
