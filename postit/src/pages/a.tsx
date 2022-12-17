import React from "react";
import Posts from "../components/posts";
import axios from "axios";

const url = "http://localhost:3000/api/v1/posts";

function getAPIData() {
  return axios.get(url).then((response) => response.data);
}
function Home() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    getAPIData().then((items: any) => {
      if (mounted) {
        setPosts(items);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="Home">
      <Posts posts={posts} />
    </div>
  );
}

export default Home;
