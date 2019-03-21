import React from "react";

export default props => {
  const { show } = props;
  const showRegister = show;
  return (
    showRegister && (
      <div className="user-form-container">
        <iframe
          width="476"
          height="267"
          src="https://abc7ny.com/video/embed/?pid=2629620"
          frameborder="0"
          allowfullscreen
        />
      </div>
    )
  );
};
