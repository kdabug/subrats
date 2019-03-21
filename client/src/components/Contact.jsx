import React from "react";


export default props => (
  <div className="contact-container">
    <h2 className="contact-header">Contact the OG Rats</h2>
    <form className="contact-form"
          id="contactform"
          action="//formspree.io/subratsapp@gmail.com"
          method="POST">
      <input
          type="text"
          name="name"
          placeholder="Enter your name here"/>
      <input
          type="email"
          name="_replyto"
          placeholder="Enter your email address here"/>
      <textarea
          name="comments"
          placeholder="Leave any additional comments or feedback here">
          </textarea>
      <input
          className="contact-input"
          type="submit"
          value="Send"/>
    </form>
  </div>
);
