import React from "react";
import { Link } from "react-router-dom";

const Footer = props => {
  const { show } = props;
  return (
    <div className="footer">
      <div className="footer-text">
        <Link to="/contact">contact</Link>
        {show && <Link to="/logout">logout</Link>}
        <a href="https://github.com/Mdellit110/subrats">github</a>
      </div>
  </div>
  );
};
export default Footer;
