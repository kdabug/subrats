import React from "react";
import { withRouter } from "react-router-dom";

const CommentList = props => {
  const { commentData } = props;
  console.log("commentList: props.commentList", commentData);
  const createDate = time => {
    const date = new Date(time);
    return date.toLocaleString("en-US");
  };
  return (
    <div className="stock-list">
      {commentData &&
        commentData
          .slice(0)
          .reverse()
          .map((comment, index) => (
            <div className="comment-container">
              <div className="comment-information">
                At{" "}
                {comment.is_there === true
                  ? createDate(comment.at_station)
                  : createDate(comment.at_station)}
                , this station was give a {comment.activity} activity rating, a{" "}
                {comment.cleanliness} rating, and a {comment.wait_time} rating
                for wait time.
                {comment.opt_comment && (
                  <p>this station has been ratted out: {comment.opt_comment}</p>
                )}
              </div>
            </div>
          ))}
    </div>
  );
};
export default withRouter(CommentList);
