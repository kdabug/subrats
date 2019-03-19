import React from "react";
import { withRouter } from "react-router-dom";
import StationList from "./StationList";

const UserProfile = props => {
  const { userData } = props;
  console.log("USERPROFILE : userData:", userData);
  console.log("USERPROFILE : props.match.params:", props.match.params);
  return (
    <div className="user-profile">
      <p>{userData.data.username}</p>
      <p>{userData.data.email}</p>
      <p>favorite stations</p>
      <StationList stations={userData.data.favoriteStations} />
      <button
        className="station-button"
        onClick={() =>
          this.props.history.push(`/user/${props.match.params}/edit/`)
        }
      >
        Edit User
      </button>
    </div>
  );
};
export default withRouter(UserProfile);
