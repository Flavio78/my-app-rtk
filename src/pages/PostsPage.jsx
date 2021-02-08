import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { getPosts, postsSelector } from "../slices/postsSlice";

const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasErrors } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(getPosts());
    return () => {
      // cleanup
    };
  }, [dispatch]);

  const renderPosts = () => {
    if (loading) return <p>Loading posts...</p>;
    if (hasErrors) return <p>Error in posts request</p>;
    return posts.map((post) => <Post key={post.id} post={post} excerpt></Post>);
  };

  return (
    <section>
      <h1>Posts</h1>
      {renderPosts()}
    </section>
  );
};

export default PostsPage;
