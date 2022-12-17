import React from "react";

interface PostAttributes {
  id: number;
  title: string;
  body: string;
}

type Props = {
  posts: PostAttributes[];
};

function Posts(props: Props) {
  return (
    <div>
      <h1>These books are from the API</h1>
      {props.posts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
