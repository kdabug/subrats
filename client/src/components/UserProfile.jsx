import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import StationList from "./StationList";
import decode from "jwt-decode";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      userData: {}
    };
  }
  async componentDidMount() {
    const checkUser = await localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      console.log(
        "this is user ComponentDidMount on UserProfile Component",
        user
      );
      await this.setState((prevState, newState) => ({
        currentUser: user,
        userData: {
          token: checkUser,
          user
        },
      }));
    }
  }
  render() {
    console.log("USERPROFILE : userData:", this.props.userData);
    console.log("USERPROFILE : props.match.params:", this.props.match.params);
    return (
      <div className="user-profile">
        <div className="user-container">
        <div className="avatar-username">
          <div className="avatar"></div>
          <h2>{this.props.userData.user.username}</h2>
        </div>
        <p>Email: {this.props.userData.user.email}</p>
        <div className="button-container">
          <button
            className="station-button"
            onClick={() =>
              this.props.history.push(`/user/${this.props.match.params.id}/edit/`)
            }
          >
          Edit User
          </button>
        </div>
      </div>
      </div>
    );
  }
}
export default withRouter(UserProfile);
