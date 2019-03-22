import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import StationList from "./StationList";
import decode from "jwt-decode";
import { getUserFavorite } from "../services/users-helpers";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      userData: {},
      userFavorites: {},
      favorites: []
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
        token: checkUser,
        userData: {
          user
        }
      }));
      const favorites = await getUserFavorite(this.props.match.params.id)
      this.setState({
        favorites
      })
    }
  }
  render() {
    console.log("USERPROFILE : userData:", this.props.userData);
    console.log("USERPROFILE : props.match.params:", this.props.match.params);
    return (
      <div className="user-profile">
        <div className="user-container">
          <div className="avatar-username">
            <div
              className={`avatar-${this.props.userData.avatar}` || "avatar-1"}
            />
            <h2>{this.props.userData.username}</h2>
          </div>
          <p>Email: {this.props.userData.email}</p>
          <div className="button-container">
            <button
              className="station-button"
              onClick={() =>
                this.props.history.push(
                  `/user/${this.props.match.params.id}/edit/`
                )
              }
            >
              Edit User
            </button>
          </div>
          <h1>User Favorites:</h1>
            <StationList
              className="station-list"
              stationList={this.state.favorites}
            />
        </div>
      </div>
    );
  }
}
export default withRouter(UserProfile);
