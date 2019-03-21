import React from "react";
import { Link } from "react-router-dom";

const Footer = props => {
  const { show, userData } = props;
  return (
    <div className="footer">
      <div className="footer-text">
        {show && (
          <>
            <Link to="/home">Home</Link>
            <Link
              to={"/user/" + userData.id + "/username/" + userData.username}
            >
              Profile
            </Link>
            <Link to="/logout">logout</Link>
          </>
        )}
        <a href="https://github.com/Mdellit110/subrats">github</a>
      </div>
    </div>
  );
};
export default Footer;
