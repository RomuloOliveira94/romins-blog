import React from "react";

import { useParams } from "react-router";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import style from "./Post.module.css";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <div className={style.post_container}>
      {loading && <p>Carregando...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata sobre: </h3>
          <div className={style.tags}>
              {post.tagsArray.map((tag) => (
                <p key={tag}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
