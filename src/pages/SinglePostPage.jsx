import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, postSelector } from "../slices/postSlice";
import { commentsSelector, getComments } from "../slices/commentsSlice";
import { Post } from "../components/Post";
import Comment from "../components/Comment";

const SinglePostPage = ({ match }) => {
  const dispatch = useDispatch();
  const { post, loading: postLoading, hasErrors: postHasErrors } = useSelector(
    postSelector
  );

  const {
    comments,
    loading: commentsLoading,
    hasErrors: commentsHasErrors,
  } = useSelector(commentsSelector);

  useEffect(() => {
    const { id } = match.params;
    dispatch(getComments(id));
    dispatch(getPost(id));
  }, [dispatch, match.params]);

  const renderPost = () => {
    if (postLoading) return <p>Loading post...</p>;
    if (postHasErrors) return <p>Error in post</p>;
    return <Post post={post} />;
  };

  const renderComments = () => {
    if (commentsLoading) return <p>Loading comments...</p>;
    if (commentsHasErrors) return <p>Error in comments</p>;
    return comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  };
  console.log("match", match);
  return (
    <section>
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  );
};

export default SinglePostPage;
