import React from "react";


export default props => (
  <div>
    <h2>Contact the OG Rats</h2>
    <form id="contactform" action="//formspree.io/subratsapp@gmail.com" method="POST">
      <input type="text" name="name"/>
      <input type="email" name="_replyto"/>
      <textarea name="comments"placeholder="leave your comments"></textarea>
      <input type="submit" value="Send"/>
    </form>
    <p>Check out <a href="https://github.com/Mdellit110/subrats">@Github</a></p>
  </div>
);
