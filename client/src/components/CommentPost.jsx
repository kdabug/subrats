import React from "react";
import {  Link } from "react-router-dom";

const CommentPost = () => {
  return (
    <div className="comment-post">
    <h1>You ratted on the subway!</h1>
    <img src="client/src/rats/New Piskel-2.png (1).png" alt="Rat"/>
    <Link to="/stations/:id/">Scurry Back</Link>
    </div>
  )
}
export default CommentPost;
