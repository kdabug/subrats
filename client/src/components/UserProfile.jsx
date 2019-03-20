import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import StationList from "./StationList";
import { fetchUserComments } from "../services/users-helpers";
import decode from "jwt-decode";
import ratAvatars from "../ratAvatars";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      userData: {}
    };
    this.getUserComments = this.getUserComments.bind(this);
  }
  async getUserComments() {
    await fetchUserComments(this.props.match.params.id);
  }
  async componentDidMount() {
    const comments = await this.getUserComments();
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
        comments: comments
      }));
    }
  }
  render() {
    console.log("USERPROFILE : userData:", this.props.userData);
    console.log("USERPROFILE : props.match.params:", this.props.match.params);
    return (
      <div className="user-profile">
        <p>UserName: {this.props.userData.user.username}</p>
        <p>Email: {this.props.userData.user.email}</p>
        {ratAvatars.map(({ id, src, title, description }) =>
          id === this.props.userData.user.avatar ? (
            <div className="image-container">
              <img key={id} src={src} title={title} alt={description} />
            </div>
          ) : (
            <></>
          )
        )}
        ;<p>favorite stations</p>
        {/* <StationList stations={} /> */}
        <button
          className="station-button"
          onClick={() =>
            this.props.history.push(`/user/${this.props.match.params.id}/edit/`)
          }
        >
          Edit User
        </button>
      </div>
    );
  }
}
export default withRouter(UserProfile);
