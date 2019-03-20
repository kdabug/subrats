import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const { show, userData } = props;
  console.log("header props", props);
  return (
    show && (
      <div className="header">
        <nav>
          <Link to="/home">Home</Link>
          <Link
            to={
              "/user/" +
              userData.user.id +
              "/username/" +
              userData.user.username
            }
          >
            Profile
          </Link>
          <Link to="/search">Search</Link>
        </nav>
      </div>
    )
  );
};
export default Header;
